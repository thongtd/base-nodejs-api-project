import { Entity, Column, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { Customer } from './customers.entity';

@Entity('customer_external_accounts')
@Unique('ix_customer_external_accounts_customerid', ['customer'])
export class CustomerExternalAccount extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  provider_name!: string;

  @Column({ type: 'varchar', length: 255 })
  external_account_id!: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer!: Customer;

  @Column({ type: 'varchar', length: 50 })
  platform!: string;
}