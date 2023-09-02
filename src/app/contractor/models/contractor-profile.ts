import { ContractorExpertiseType } from "./enums/contractor-expertise-type";
import { Profile } from "../../shared/models/profile";

export interface ContractorProfile extends Profile {

  contractorExpertiseType: ContractorExpertiseType;
  // todo => availabilities

}
