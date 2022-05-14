export default class BookDTO {
  constructor(
    public _id: string = "",
    public title: string = "",
    public comments: string[] = [],
    public commentcount: number = 0
  ) {}
}
