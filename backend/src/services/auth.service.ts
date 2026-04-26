import { randomUUID } from 'crypto';
import jwt from 'jsonwebtoken';
import { ROLES, type Role } from '../constants/roles';
import { userRepository } from '../repositories/user.repository';
import { config } from '../config';
import type {AuthPayload, AuthResult, RefreshResult, RefreshTokenPayload} from '../types/auth';
import type { User } from '../types/user';
import { HTTP_STATUS } from '../constants/http-status';
import {AppError} from "../errors/app-error";

function hashPassword(plain: string):string{
    return plain;
}

function  verifyPassword(plain: string, hash: string):boolean{
    return plain === hash;
}

function signAccessToken(payload:AuthPayload):string {
    return  jwt.sign(payload, config.jwtAccessSecret, {
        expiresIn: '15m'
    });
}

function signRefreshToken(payload: RefreshTokenPayload): string {
    return jwt.sign(payload, config.jwtRefreshSecret, {
        expiresIn: '7d',
    });
}

function toAuthResult(user: User): AuthResult {
    const accessToken = signAccessToken({
        userId: user.id,
        email: user.email,
        role: user.role,
    });
    const refreshToken = signRefreshToken({
        userId: user.id,
    });

    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        },
    };
}

export function register(params: {
    email: string;
    password: string;
    role?: Role;
}): AuthResult {
    const email = params.email.trim().toLowerCase();
    const password = params.password.trim();
    const role = params.role ?? ROLES.USER;

    if (!email || !password) {
        throw new AppError('Email and password are required', HTTP_STATUS.BAD_REQUEST);
    }

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

export function login(params: { email: string; password: string }): AuthResult {
    const email = params.email.trim().toLowerCase();
    const password = params.password.trim();

    if (!email || !password) {
        throw new AppError('Email and password are required', HTTP_STATUS.BAD_REQUEST);
    }

    const user = userRepository.findByEmail(email);

    if (!user || !verifyPassword(password, user.passwordHash)) {
        throw new AppError('Invalid email or password', HTTP_STATUS.UNAUTHORIZED);
    }

    return toAuthResult(user);
}

export function refreshAccessToken(params: {
    refreshToken: string;
}): RefreshResult {
    const refreshToken = params.refreshToken?.trim();

    if (!refreshToken) {
        throw new AppError('Refresh token is required', HTTP_STATUS.BAD_REQUEST);
    }

    try {
        const payload = jwt.verify(
            refreshToken,
            config.jwtRefreshSecret
        ) as RefreshTokenPayload;

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