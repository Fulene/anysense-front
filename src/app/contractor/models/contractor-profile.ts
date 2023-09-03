import { ContractorExpertiseType } from "./enums/contractor-expertise-type";
import { UserProfile } from "../../shared/models/user-profile";

export class ContractorProfile extends UserProfile {

  contractorExpertiseType?: ContractorExpertiseType;
  // todo => availabilities

}
