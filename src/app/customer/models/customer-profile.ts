import { UserProfile } from "../../shared/models/user-profile";
import { ProfileType } from "../../shared/models/enums/profile-type";

export class CustomerProfile extends UserProfile {

  // todo => projects

    constructor() {
        super();
        this.type = ProfileType.CUSTOMER;
    }

}
