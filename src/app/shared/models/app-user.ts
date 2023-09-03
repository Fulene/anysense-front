import { UserProfile } from "./user-profile";

export class AppUser {

  kcId?: string;
  name?: string;
  firstname?: string;
  email?: string;
  profiles: UserProfile[] = [];

  constructor(data?: Partial<AppUser>) {
  }

}
