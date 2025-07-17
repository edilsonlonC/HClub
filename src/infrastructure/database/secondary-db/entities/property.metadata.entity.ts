import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class PropertyMetadata {
  @PrimaryColumn({
    name: 'property_id',
  })
  propertyId: string;
  @Column('text')
  description: string;

  @Column({
    name: 'image_url',
  })
  imageUrl: string;

  constructor(propertyId: string, description: string, imageUrl: string) {
    this.propertyId = propertyId;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}
