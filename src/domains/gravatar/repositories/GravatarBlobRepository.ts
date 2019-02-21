import { GravatarRepository } from "./GravatarRepository";
import { User } from "../../users/User";
import { Fetcher } from "../../Fetcher";

export class GravatarBlobRepository implements GravatarRepository {
  private url: string;

  constructor(private readonly fetcher: Fetcher) {
    this.url =
      "https://cors-anywhere.herokuapp.com/https://seccdn.libravatar.org/avatar";
  }

  async getUserByEmailHash(hash: string): Promise<User> {
    const response = await this.fetcher(`${this.url}/${hash}`);
    const result = await response.blob();
    const object = URL.createObjectURL(result);
    return new User(object);
  }
}
