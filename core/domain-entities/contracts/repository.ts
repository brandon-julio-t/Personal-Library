export default interface Repository<T> {
  get entityName(): string;

  findAll(): T[];
  save(entity: T): T;
  delete(entity: T): T;
}
