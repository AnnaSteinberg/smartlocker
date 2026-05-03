import { randomUUID } from 'crypto';
import { ROLES } from '../constants/roles';
import type { User } from '../types/user';
import { hashPassword } from '../lib/password';

function nowIso(): string {
    return new Date().toISOString();
}

type SeedUser = {
    email: string;
    password: string;
    role: User['role'];
};

const seedUsers: SeedUser[] = [
    {
        email: 'admin@smartlocker.local',
        password: 'admin123',
        role: ROLES.ADMIN,
    },
    {
        email: 'operator@smartlocker.local',
        password: 'operator123',
        role: ROLES.OPERATOR,
    },
    {
        email: 'user@smartlocker.local',
        password: 'user12345',
        role: ROLES.USER,
    },
];

export const usersStore: User[] = seedUsers.map((seed) => ({
    id: randomUUID(),
    email: seed.email,
    passwordHash: hashPassword(seed.password),
    role: seed.role,
    createdAt: nowIso(),
}));

export function findUserByEmail(email: string): User | undefined {
    return usersStore.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function addUser(user: User): void {
    usersStore.push(user);
}

export function findUserById(id: string): User | undefined {
    return usersStore.find((user) => user.id === id);
}