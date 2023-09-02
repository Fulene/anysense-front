import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ContractorProfile } from "../models/contractor-profile";
import { BaseEntityService } from "../../shared/services/base-entity-service";

@Injectable({
  providedIn: 'root'
})
export class ContractorProfileService extends BaseEntityService<ContractorProfile>{

  constructor(protected override http: HttpClient) {
    super('contractor-profile', http);
  }

}
