import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class PropertyMetadata {
  @PrimaryColumn({ type: 'char', length: 36 })
  property_id: string; // debe coincidir con apartment.id de DB1

  @Column('text')
  description: string;

  @Column({ type: 'varchar', length: 2048 })
  image_url: string;
}
