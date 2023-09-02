import { Profile } from "./profile";

export interface AppUser {

  kcId: string;
  name: string;
  firstname: string;
  email: string;
  profiles: Profile[];

}
