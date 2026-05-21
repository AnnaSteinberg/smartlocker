import { randomUUID } from 'crypto';
import jwt from 'jsonwebtoken';
import { ROLES, type Role } from '../constants/roles';
import { userRepository } from '../repositories/user.repository';
import { config } from '../config';
import type {AuthPayload, AuthResult, AuthUserResponse, RefreshResult, RefreshTokenPayload} from '../types/auth';
import type { User } from '../types/user';
import { HTTP_STATUS } from '../constants/http-status';
import {AppError} from "../errors/app-error";
import { hashPassword, verifyPassword } from '../lib/password';
import {assertLoginAllowed, registerFailedLogin, resetLoginAttempts,} from './login-attempts.service';
import { TOKEN_SETTINGS } from '../constants/token.constants';
import {refreshTokenRepository} from "../repositories/refresh-token.repository";

function signAccessToken(payload:AuthPayload):string {
    return  jwt.sign(payload, config.jwtAccessSecret, {
        expiresIn: TOKEN_SETTINGS.ACCESS_TOKEN_EXPIRES_IN
    });
}

function signRefreshToken(payload: RefreshTokenPayload): string {
    return jwt.sign(payload, config.jwtRefreshSecret, {
        expiresIn: TOKEN_SETTINGS.REFRESH_TOKEN_EXPIRES_IN,
    });
}

function createRefreshToken(userId: string): string {
    const tokenId = randomUUID();
    const refreshToken = signRefreshToken({
        userId,
        tokenId,
    });

    const nowMs = Date.now();

    refreshTokenRepository.save({
        tokenId,
        userId,
        createdAt: new Date(nowMs).toISOString(),
        expiresAt: new Date(nowMs + TOKEN_SETTINGS.REFRESH_TOKEN_TTL_MS).toISOString(),
    });

    return refreshToken;
}

function toAuthUserResponse(user: User): AuthUserResponse {
    return {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
    };
}

function toAuthResult(user: User): AuthResult {
    const accessToken = signAccessToken({
        userId: user.id,
        email: user.email,
        role: user.role,
    });
    const refreshToken =  createRefreshToken(user.id);

    return {
        accessToken,
        refreshToken,
        user: toAuthUserResponse(user),
    };
}

export function register(params: {
    email: string;
    password: string;
}): AuthResult {
    const email = params.email;
    const password = params.password;
    const role = ROLES.USER;


    if (userRepository.findByEmail(email)) {
        throw new AppError('User already exists', HTTP_STATUS.CONFLICT);
    }

    const user: User = {
        id: randomUUID(),
        email,
        passwordHash: hashPassword(password),
        role,
        createdAt: new Date().toISOString(),
    };

    userRepository.add(user);

    return toAuthResult(user);
}

export function refreshAccessToken(params: {
    refreshToken: string;
}): RefreshResult {
    const refreshToken = params.refreshToken;

    if (!refreshToken) {
        throw new AppError('Refresh token is required', HTTP_STATUS.BAD_REQUEST);
    }

    try {
        const payload = jwt.verify(
            refreshToken,
            config.jwtRefreshSecret
        ) as RefreshTokenPayload;

        const storedToken = refreshTokenRepository.findByTokenId(payload.tokenId);

        if (!storedToken || storedToken.revokedAt) {
            throw new AppError('Refresh token has been revoked', HTTP_STATUS.UNAUTHORIZED);
        }

        if (new Date(storedToken.expiresAt).getTime() <= Date.now()) {
            throw new AppError('Refresh token has expired', HTTP_STATUS.UNAUTHORIZED);}

        const user = userRepository.findById(payload.userId);

        if (!user) {
            throw new AppError('User not found', HTTP_STATUS.UNAUTHORIZED);
        }

        return {
            accessToken: signAccessToken({
                userId: user.id,
                email: user.email,
                role: user.role,
            }),
        };
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError('Invalid or expired refresh token', HTTP_STATUS.UNAUTHORIZED);
    }
}

export function assignRoleToUser(params: {
    userId: string;
    role: Role;
}): AuthUserResponse {
    const user = userRepository.updateRoleById(params.userId, params.role);

    if (!user) {
        throw new AppError('User not found', HTTP_STATUS.NOT_FOUND);
    }

    return toAuthUserResponse(user);
}

export function login(params: { email: string; password: string }): AuthResult {
    const email = params.email;
    const password = params.password;

    try {
        // 1) Сначала проверяем lockout для аккаунта.
        assertLoginAllowed(email);

        // 2) Ищем пользователя и проверяем пароль.
        const user = userRepository.findByEmail(email);

        if (!user || !verifyPassword(password, user.passwordHash)) {
            // 3) Неверный вход -> увеличиваем счетчик неудач.
            registerFailedLogin(email);
            throw new AppError('Invalid email or password', HTTP_STATUS.UNAUTHORIZED);
        }

        // 4) Успешный вход -> очищаем счетчик неудач.
        resetLoginAttempts(email);

        return toAuthResult(user);
    } catch (error) {
        // 5) Спец-ошибка lockout преобразуем в HTTP 429.
        if (error instanceof Error && error.message === 'ACCOUNT_LOCKED') {
            throw new AppError(
                'Account is temporarily locked due to too many failed login attempts',
                HTTP_STATUS.TOO_MANY_REQUESTS
            );
        }

        throw error;
    }


}

export function logout(params: { refreshToken: string }): void {
    const refreshToken = params.refreshToken;

    if (!refreshToken) {
        throw new AppError('Refresh token is required', HTTP_STATUS.BAD_REQUEST);
    }

    try {
        const payload = jwt.verify(
            refreshToken,
            config.jwtRefreshSecret
        ) as RefreshTokenPayload;

        const revokedToken = refreshTokenRepository.revokeByTokenId(payload.tokenId);

        if (!revokedToken) {
            throw new AppError('Refresh token not found', HTTP_STATUS.UNAUTHORIZED);
        }
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError('Invalid or expired refresh token', HTTP_STATUS.UNAUTHORIZED);
    }
}
