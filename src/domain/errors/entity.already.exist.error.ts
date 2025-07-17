export class EntityAlreadyExistError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EntityAlreadyExistError';
  }
}
