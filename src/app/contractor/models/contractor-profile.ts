import { ContractorExpertiseType } from "./enums/contractor-expertise-type";
import { UserProfile } from "../../shared/models/user-profile";
import { ProfileType } from "../../shared/models/enums/profile-type";

export class ContractorProfile extends UserProfile {

  contractorExpertiseType?: ContractorExpertiseType;
  // todo => availabilities

  constructor() {
    super();
    this.type = ProfileType.CONTRACTOR;
  }

}
