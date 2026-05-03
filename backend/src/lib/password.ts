import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

const HASH_ALGORITHM = 'scrypt';
const KEY_LENGTH = 64;
const SCRYPT_COST = 16384;
const SCRYPT_BLOCK_SIZE = 8;
const SCRYPT_PARALLELIZATION = 1;

function deriveKey(password: string, salt: string): Buffer {
    return scryptSync(password, salt, KEY_LENGTH, {
        N: SCRYPT_COST,
        r: SCRYPT_BLOCK_SIZE,
        p: SCRYPT_PARALLELIZATION,
    });
}

export function hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const key = deriveKey(password, salt).toString('hex');

    return [
        HASH_ALGORITHM,
        SCRYPT_COST,
        SCRYPT_BLOCK_SIZE,
        SCRYPT_PARALLELIZATION,
        salt,
        key,
    ].join('$');
}

export function verifyPassword(password: string, encodedHash: string): boolean {
    const parts = encodedHash.split('$');

    if (parts.length !== 6 || parts[0] !== HASH_ALGORITHM) {
        return false;
    }

    const salt = parts[4];
    const storedKeyHex = parts[5];

    const derivedKey = deriveKey(password, salt);
    const storedKey = Buffer.from(storedKeyHex, 'hex');

    if (storedKey.length !== derivedKey.length) {
        return false;
    }

    return timingSafeEqual(storedKey, derivedKey);}