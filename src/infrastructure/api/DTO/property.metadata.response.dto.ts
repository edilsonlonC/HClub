export class PropertyMetadataResponseDTO {
  constructor(
    private propertyId: string,
    private description: string,
    private imageUrl: string,
  ) {}
  getPropertyId(): string {
    return this.propertyId;
  }
  getDescription(): string {
    return this.description;
  }
  getImageUrl(): string {
    return this.imageUrl;
  }
}
