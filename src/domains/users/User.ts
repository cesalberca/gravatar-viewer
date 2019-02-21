export class User {
  constructor(private readonly photo: string) {}

  static empty() {
    return new User("");
  }

  exists(): boolean {
    return this.photo.length !== 0;
  }
}
