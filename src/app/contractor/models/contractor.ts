import { AppUser } from "../../shared/models/app-user";
import { ContractorExpertiseType } from "./enums/contractor-expertise-type";

export interface Contractor extends AppUser {
  contractorExpertiseType: ContractorExpertiseType
}
