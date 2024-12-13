import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import 'dotenv/config';

const jwtSecret = process.env.JWT_SECRET || '';
const jwtExpiration = process.env.JWT_EXPIRATION || '1h';
const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION || '7d';

interface TokenPayload extends JwtPayload {
  id: number;
  userName: string;
  email: string;
}

/**
 * Generate JWT Token
 * @param payload - Token payload
 * @returns Jwt token
 */
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  });
}

/**
 * Generate Refresh Token
 * @param payload - Refresh token payload
 * @returns Refresh token
 */
export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: refreshTokenExpiration,
  });
}

/**
 * Verify JWT Token
 * @param token - JWT Token
 * @returns Payload
 * @throws Error
 */
export function verifyToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, jwtSecret) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Parse payload
 * @param token - Token
 * @returns TokenPayload
 */
export function parseToken(token: string): TokenPayload | null {
  try {
    return jwt.decode(token) as TokenPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Get JWT from header Authorization
 * @param req - Express Request
 * @returns Token string or null
 */
export function extractTokenFromHeader(req: Request): string | null {
  const authHeader = req.header('Authorization');
  return authHeader?.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null;
}

/**
 * Parse payload from header
 * @param token - Token
 * @returns TokenPayload
 */
export function parseTokenFromHeader(req: Request): TokenPayload | null {
  try {
    var token = extractTokenFromHeader(req);
    if (token == null) {
      return null;
    }

    return jwt.decode(token) as TokenPayload;
  } catch (error) {
    return null;
  }
}