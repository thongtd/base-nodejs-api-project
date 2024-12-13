import { Entity, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { Customer } from './customers.entity';
import { Province } from '../locations/province.entity';
import { District } from '../locations/district.entity';

@Entity('customer_meta_data')
@Unique('ix_customer_meta_data_customerid', ['customer'])
export class CustomerMetaData extends BaseEntity {
  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer!: Customer;

  @Column({ type: 'datetime', precision: 6, nullable: true })
  date_of_birth: Date | undefined;

  @Column({ type: 'varchar', length: 1000 })
  address: string = "";

  @Column({ type: 'varchar', length: 100 })
  country_code: string = "";

  @ManyToOne(() => Province)
  @JoinColumn({ name: 'province_id' })
  province: Province | undefined;

  @ManyToOne(() => District)
  @JoinColumn({ name: 'district_id' })
  district: District | undefined;

  @Column({ type: 'longtext' })
  avatar: string = "";

  @Column({ type: 'tinyint', nullable: true })
  gender: number | undefined;

  @Column({ type: 'varchar', length: 10, nullable: true })
  default_language: string | undefined;

  @Column({ type: 'tinyint' })
  allow_email_noti: boolean = false;

  @Column({ type: 'tinyint' })
  allow_app_noti: boolean = false;

  @Column({ type: 'varchar', length: 50, nullable: true })
  post_code: string = "";
}