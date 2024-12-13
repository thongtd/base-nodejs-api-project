import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../base-entity';
import { Province } from './province.entity';

@Entity('districts')
export class District extends BaseEntity {
  @ManyToOne(() => Province)
  @JoinColumn({ name: 'province_id' })
  province: Province | undefined;

  @Column({ type: 'varchar', length: 512 })
  full_name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  short_name: string | undefined;

  @Column({ type: 'tinyint' })
  enabled: boolean = true;
}