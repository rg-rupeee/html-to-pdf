import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Status {
  STARTED = 'started',
  COMPLETED = 'completed',
  ERROR = 'error',
}

@Entity()
class Log extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.STARTED,
  })
  status: Status;

  @Column({ nullable: true })
  error_reason: String;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  static logError(id: number, error_reason?: string) {
    return this.update({ id }, { status: Status.ERROR, error_reason });
  }
}

export default Log;
