import type { StoredRefreshToken } from '../types/auth';

export interface RefreshTokenRepository {
    save(token: StoredRefreshToken): void;
    findByTokenId(tokenId: string): StoredRefreshToken | undefined;
    revokeByTokenId(tokenId: string): StoredRefreshToken | undefined;
}

class InMemoryRefreshTokenRepository implements RefreshTokenRepository {
    private readonly tokens = new Map<string, StoredRefreshToken>();

    save(token: StoredRefreshToken): void {
        this.tokens.set(token.tokenId, token);
    }

    findByTokenId(tokenId: string): StoredRefreshToken | undefined {
        return this.tokens.get(tokenId);
    }

    revokeByTokenId(tokenId: string): StoredRefreshToken | undefined {
        const token = this.tokens.get(tokenId);

        if (!token) {
            return undefined;
        }

        const revokedToken: StoredRefreshToken = {
            ...token,
            revokedAt: new Date().toISOString(),
        };

        this.tokens.set(tokenId, revokedToken);
        return revokedToken;
    }
}

export const refreshTokenRepository: RefreshTokenRepository =
    new InMemoryRefreshTokenRepository();