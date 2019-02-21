import { GravatarRepository } from "./GravatarRepository";
import { GravatarBlobRepository } from "./GravatarBlobRepository";
import { Fetcher } from "../../Fetcher";

export class GravatarRepositoryFactory {
  static photo(): GravatarRepository {
    const fetcher = window.fetch.bind(window) as Fetcher;
    return new GravatarBlobRepository(fetcher);
  }
}
