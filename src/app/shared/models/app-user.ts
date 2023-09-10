import { UserProfile } from "./user-profile";

export class AppUser {

  kcId?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  profiles: UserProfile[] = [];

}
