import Model from "../../domain-entities/contracts/model";
import Database from "./database";

export default class InMemoryDatabase extends Database {
  private database = new Map<string, Model[]>();

  private getDataArray(entityName: string): Model[] {
    let data = this.database.get(entityName);
    if (!data) {
      data = [];
      this.database.set(entityName, data);
    }
    return data;
  }

  public queryAll<T extends Model[]>(entityName: string): T {
    return this.getDataArray(entityName) as T;
  }

  public queryAllByFilterFunction<T extends Model[]>(
    entityName: string,
    filterFn: (entity: Model) => boolean
  ): T {
    return this.getDataArray(entityName).filter(filterFn) as T;
  }

  public queryOneByFilterFunction<T extends Model>(
    entityName: string,
    filterFn: (entity: Model) => boolean
  ): T {
    return this.getDataArray(entityName).find(filterFn) as T;
  }

  public save<T extends Model>(entityName: string, entity: Model): T {
    const data = this.getDataArray(entityName);
    data.push(entity);
    return entity as T;
  }

  public delete<T extends Model>(entityName: string, entity: Model): T {
    const data = this.getDataArray(entityName);
    const idx = data.findIndex(d => d.getPrimaryKey() === entity.getPrimaryKey());
    data.splice(idx, 1);
    return entity as T;
  }
}
