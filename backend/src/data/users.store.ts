import { randomUUID } from 'crypto';
import { ROLES } from '../constants/roles';
import type { User } from '../types/user';

function nowIso():string{
    return new Date().toISOString();
}

export const usersStore: User[] = [
    {
        id: randomUUID(),
        email: 'admin@smartlocker.local',
        passwordHash: 'admin123', // временно plain, заменим на hash в auth-шаге
        role: ROLES.ADMIN,
        createdAt: nowIso(),
    },
    {
        id: randomUUID(),
        email: 'operator@smartlocker.local',
        passwordHash: 'operator123',
        role: ROLES.OPERATOR,
        createdAt: nowIso(),
    },
    {
        id: randomUUID(),
        email: 'user@smartlocker.local',
        passwordHash: 'user123',
        role: ROLES.USER,
        createdAt: nowIso(),
    },
];

export function findUserByEmail(email: string): User | undefined {
    return usersStore.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function addUser(user: User): void {
    usersStore.push(user);
}

export function findUserById(id: string): User | undefined {
    return usersStore.find((user) => user.id === id);
}