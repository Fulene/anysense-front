import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map, Observable } from "rxjs";
import { Contractor } from "../models/contractor";

@Injectable({
  providedIn: 'root'
})
export class ContractorService {
  private API_ENDPOINT = environment.apiHost + 'contractor'

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Contractor[]> {
    return this.http.get<any>(this.API_ENDPOINT + "/all");
  }

}
