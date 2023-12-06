import { UserProfile } from "./user-profile";

export class AppUser {

  id?: number;
  kcId?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  profiles: UserProfile[] = [];

}
