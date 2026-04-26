import type { Role } from '../constants/roles';

export interface User {
    id: string;
    email: string;
    passwordHash: string;
    role: Role;
    createdAt: string;
}