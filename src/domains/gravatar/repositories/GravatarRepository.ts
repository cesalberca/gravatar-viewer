import { User } from "../../users/User";

export interface GravatarRepository {
  getUserByEmailHash(hash: string): Promise<User>;
}
