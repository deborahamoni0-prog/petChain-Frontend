import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
} from 'typeorm';

/**
 * Entity to track password history for preventing password reuse
 */
@Entity('password_history')
@Index(['userId', 'createdAt'])
export class PasswordHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  userId: string;

  @Column()
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;
}
