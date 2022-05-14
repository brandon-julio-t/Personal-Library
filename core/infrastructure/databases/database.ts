import Model from "../../domain-entities/contracts/model";

export default abstract class Database {
  protected databaseName: string = "personal-libary";

  public abstract queryAll<T extends Model[]>(entityName: string): T;

  public abstract queryAllByFilterFunction<T extends Model[]>(
    entityName: string,
    filterFn: (entity: Model) => boolean
  ): T;

  public abstract queryOneByFilterFunction<T extends Model>(
    entityName: string,
    filterFn: (entity: Model) => boolean
  ): T;

  public abstract save<T extends Model>(entityName: string, entity: Model): T;

  public abstract delete<T extends Model>(entityName: string, entity: Model): T;
}
