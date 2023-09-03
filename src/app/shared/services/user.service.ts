import { Injectable } from '@angular/core';
import { BaseEntityService } from "./base-entity-service";
import { AppUser } from "../models/app-user";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseEntityService<AppUser> {

  constructor(protected override http: HttpClient) {
    super('user', http);
  }

}
