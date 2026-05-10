import type { User } from '../types/user';
import { addUser, findUserByEmail, findUserById, updateUserRoleById } from '../data/users.store';
import {Role} from "../constants/roles";

export interface UserRepository {
    findByEmail(email: string): User | undefined;
    findById(id: string): User | undefined;
    add(user: User): void;
    updateRoleById(id: string, role: Role): User | undefined;
}

class InMemoryUserRepository implements UserRepository {
    findByEmail(email: string): User | undefined {
        return findUserByEmail(email);
    }

    findById(id: string): User | undefined {
        return findUserById(id);
    }

    add(user: User): void {
        addUser(user);
    }

    updateRoleById(id: string, role: Role): User | undefined {
        return updateUserRoleById(id, role);
    }
}

export const userRepository: UserRepository = new InMemoryUserRepository();