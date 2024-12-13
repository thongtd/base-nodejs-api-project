import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'tinyint', default: 0 })
  is_delete: boolean = false;

  @Column({ type: 'int', nullable: true })
  created_by?: number;

  @CreateDateColumn({ type: 'datetime', precision: 6 })
  created_date!: Date;

  @Column({ type: 'int', nullable: true })
  modified_by?: number;

  @UpdateDateColumn({ type: 'datetime', precision: 6, nullable: true })
  modified_date?: Date;
}  