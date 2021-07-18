export class Article {
  constructor(
    public id: string,
    public title: string,
    public categories: string[],
    public date: Date,
    public link: string,
    public imageURL: string
  ) {}
}
