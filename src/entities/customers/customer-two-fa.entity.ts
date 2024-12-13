import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { Customer } from './customers.entity';

@Entity('customer_two_fa')
export class CustomerTwoFA extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  two_factor_service!: string;

  @Column({ type: 'longtext' })
  setting!: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer!: Customer;
}
