import Model from "../contracts/model";

export default class Comment extends Model {
  public getPrimaryKeyName(): string {
    return "_id";
  }

  constructor(
    public _id: string = "",
    public body: string = "",
    public bookId: string = ""
  ) {
    super();
  }
}
