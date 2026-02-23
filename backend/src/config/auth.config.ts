import { registerAs } from '@nestjs/config';

export const authConfig = registerAs('auth', () => ({
  jwtSecret:
    process.env.JWT_SECRET ||
    'your-secret-key-min-32-chars-change-in-production',
  jwtAccessExpiration: process.env.JWT_ACCESS_EXPIRATION || '15m',
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
  maxConcurrentSessions: parseInt(
    process.env.MAX_CONCURRENT_SESSIONS || '3',
    10,
  ),
  accountLockoutDuration: process.env.ACCOUNT_LOCKOUT_DURATION || '15m',
  passwordResetExpiration: process.env.PASSWORD_RESET_EXPIRATION || '1h',
  emailVerificationExpiration:
    process.env.EMAIL_VERIFICATION_EXPIRATION || '24h',
  maxFailedLoginAttempts: 5,
  // Password policy settings
  passwordExpiryDays: process.env.PASSWORD_EXPIRY_DAYS
    ? parseInt(process.env.PASSWORD_EXPIRY_DAYS, 10)
    : 90, // Default 90 days, set to 0 to disable
  passwordHistoryLimit: parseInt(process.env.PASSWORD_HISTORY_LIMIT || '5', 10), // Prevent reuse of last 5 passwords
  minPasswordLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSymbols: true,
}));
