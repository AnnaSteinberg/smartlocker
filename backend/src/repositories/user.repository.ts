import type { User } from '../types/user';
import { addUser, findUserByEmail, findUserById } from '../data/users.store';

export interface UserRepository {
    findByEmail(email: string): User | undefined;
    findById(id: string): User | undefined;
    add(user: User): void;
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
}

export const userRepository: UserRepository = new InMemoryUserRepository();