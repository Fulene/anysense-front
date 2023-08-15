import { AppUser } from "../../shared/models/app-user";
import { SubcontractorExpertiseType } from "./enums/subcontractor-expertise-type";

export interface Subcontractor extends AppUser {
  subcontractorExpertiseType: SubcontractorExpertiseType
}
