import { Injectable } from '@angular/core';
import { BaseEntityService } from "../../shared/services/base-entity-service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerProfileService extends BaseEntityService<CustomerProfileService>{

  constructor(protected override http: HttpClient) {
    super('customer-profile', http);
  }

}
