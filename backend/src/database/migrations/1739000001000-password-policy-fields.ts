import { MigrationInterface, QueryRunner } from 'typeorm';

export class PasswordPolicyFields1739000001000 implements MigrationInterface {
  name = 'PasswordPolicyFields1739000001000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add password expiry fields to users table
    await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "passwordExpiresAt" TIMESTAMP,
      ADD COLUMN IF NOT EXISTS "passwordChangeRequired" BOOLEAN DEFAULT false
    `);

    // Create password_history table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "password_history" (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "userId" UUID NOT NULL,
        "passwordHash" VARCHAR(255) NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create index for faster lookups
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_password_history_userId" 
      ON "password_history" ("userId")
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS "IDX_password_history_userId_createdAt" 
      ON "password_history" ("userId", "createdAt" DESC)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes
    await queryRunner.query(`
      DROP INDEX IF EXISTS "IDX_password_history_userId_createdAt"
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS "IDX_password_history_userId"
    `);

    // Drop password_history table
    await queryRunner.query(`
      DROP TABLE IF EXISTS "password_history"
    `);

    // Remove columns from users table
    await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "passwordChangeRequired",
      DROP COLUMN IF EXISTS "passwordExpiresAt"
    `);
  }
}
