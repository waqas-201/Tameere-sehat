import { SignJWT, jwtVerify } from 'jose';
import { AuthUser, UserJWTPayload, UserRole, AuthProvider } from './auth-types';

const JWT_SECRET_STRING = process.env.JWT_SECRET || 'tameer-e-sehat-unani-jwt-secret-key-production-2026';
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STRING);

/**
 * Sign a new JWT token for an authenticated user
 */
export async function signUserToken(user: AuthUser, expiresIn: string = '7d'): Promise<string> {
  const payload: UserJWTPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    provider: user.provider,
  };

  const jwt = await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .setIssuer('tameer-e-sehat-apothecary')
    .setAudience('tameer-e-sehat-app')
    .sign(JWT_SECRET);

  return jwt;
}

/**
 * Verify and decode an incoming JWT token
 */
export async function verifyUserToken(token: string): Promise<UserJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: 'tameer-e-sehat-apothecary',
      audience: 'tameer-e-sehat-app',
    });

    return {
      userId: payload.userId as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as UserRole,
      provider: payload.provider as AuthProvider,
      iat: payload.iat,
      exp: payload.exp,
    };
  } catch (error) {
    console.error('JWT Verification failed:', error);
    return null;
  }
}

/**
 * Simple WebCrypto-based SHA-256 password hash generator
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const salt = 'tameer_unani_salt_v1_';
  const data = encoder.encode(salt + password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Compare plain text password against stored hash
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const computedHash = await hashPassword(password);
  return computedHash === storedHash;
}
