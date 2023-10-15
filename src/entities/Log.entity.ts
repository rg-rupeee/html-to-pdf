import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum LogStatus {
  STARTED = 'started',
  COMPLETED = 'completed',
  ERROR = 'error',
}

export enum LogType {
  URL = 'url',
  FILE = 'file',
  DATA = 'data',
}

@Entity()
class Log extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: LogType,
    nullable: false,
  })
  type: LogType;

  @Column({
    type: 'enum',
    enum: LogStatus,
    default: LogStatus.STARTED,
  })
  status: LogStatus;

  @Column({ nullable: true })
  error_reason: String;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  static logError(id: number, error_reason?: string) {
    return this.update({ id }, { status: LogStatus.ERROR, error_reason });
  }
}

export default Log;
