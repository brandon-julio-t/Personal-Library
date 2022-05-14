interface Indexable {
  [key: string]: any;
}

export default abstract class Model {
  public abstract getPrimaryKeyName(): string;

  public getPrimaryKey(): string {
    const model = this as Indexable;
    return model[this.getPrimaryKeyName()];
  }

  public setPrimaryKey(value: string): void {
    const model = this as Indexable;
    model[this.getPrimaryKeyName()] = value;
    Object.assign(this, model);
  }
}
