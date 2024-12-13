import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base-entity';

@Entity('provinces')
export class Province extends BaseEntity {
  @Column({ type: 'varchar', length: 512 })
  full_name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  short_name: string | undefined;

  @Column({ type: 'tinyint' })
  enabled: boolean = true;

  @Column({ type: 'varchar', length: 10 })
  country_code!: string;
}