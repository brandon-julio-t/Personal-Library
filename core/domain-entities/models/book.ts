import Model from "../contracts/model";

export default class Book extends Model {
  public getPrimaryKeyName(): string {
    return '_id';
  }
  
  constructor(
    public _id: string = "",
    public title: string = "",
  ) {
    super();
  }
}
