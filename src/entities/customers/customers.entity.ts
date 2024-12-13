import { Entity, Column, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from '../base-entity';

@Entity('customers')
@Unique('ix_customers_normalizedusername', ['normalized_user_name'])
@Unique('ix_customers_normalizedemail', ['normalized_email'])
export class Customer extends BaseEntity {
  @Column({ type: 'varchar', length: 256 })
  user_name!: string;

  @Column({ type: 'varchar', length: 256 })
  normalized_user_name!: string;

  @Column({ type: 'varchar', length: 256 })
  email!: string;

  @Column({ type: 'varchar', length: 256 })
  normalized_email!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  full_name!: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  last_login_ip_address: string = "";

  @Column({ type: 'datetime', precision: 6, nullable: true })
  last_login_time: Date | undefined;

  @Column({ type: 'varchar', length: 50, nullable: true })
  via: string = "";

  @Column({ type: 'tinyint' })
  is_default_password: boolean = false;

  @Column({ type: 'datetime', precision: 6, nullable: true })
  email_confirm_date: Date | undefined;

  @Column({ type: 'datetime', precision: 6, nullable: true })
  phone_confirm_date: Date | undefined;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status: string | undefined;

  @Column({ type: 'tinyint', nullable: true })
  is_system_locked: boolean | undefined;

  @Column({ type: 'varchar', length: 512, nullable: true })
  locked_description: string | undefined;

  @Column({ type: 'tinyint' })
  email_confirmed: boolean | undefined;

  @Column({ type: 'varchar', length: 512, nullable: true })
  password_hash: string | undefined;

  @Column({ type: 'varchar', length: 512, nullable: true })
  security_stamp: string | undefined;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone_number: string | undefined;

  @Column({ type: 'tinyint' })
  phone_number_confirmed: boolean = false;

  @Column({ type: 'tinyint' })
  two_factor_enabled: boolean = false;

  @Column({ type: 'datetime', precision: 6, nullable: true })
  lockout_end: Date | undefined;

  @Column({ type: 'tinyint' })
  lockout_enabled: boolean = false;

  @Column({ type: 'int' })
  access_failed_count: number = 0;
}