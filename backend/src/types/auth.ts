import type { Role } from '../constants/roles';

export interface AuthPayload {
    userId: string;
    email: string;
    role: Role;
}

export interface RefreshTokenPayload {
    userId: string;
}

export interface AuthUserResponse {
    id: string;
    email: string;
    role: Role;
    createdAt: string;
}

export interface AuthResult {
    accessToken: string;
    refreshToken: string;
    user: AuthUserResponse;
}

export interface RefreshResult {
    accessToken: string;
}