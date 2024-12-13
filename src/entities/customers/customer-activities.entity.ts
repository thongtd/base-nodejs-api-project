import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { Customer } from './customers.entity';

@Entity('customer_activities')
export class CustomerActivities extends BaseEntity {
  @Column({ type: 'varchar', length: 128, nullable: true })
  ip_address: string = "";

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string = "";

  @Column({ type: 'varchar', length: 255, nullable: true })
  user_agent: string = "";

  @Column({ type: 'varchar', length: 128, nullable: true })
  action: string = "";

  @Column({ type: 'varchar', length: 128, nullable: true })
  via: string = "";

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string = "";

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer!: Customer;
}