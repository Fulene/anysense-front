import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map, Observable } from "rxjs";
import { Subcontractor } from "../models/subcontractor";

@Injectable({
  providedIn: 'root'
})
export class SubcontractorService {
  private API_ENDPOINT = environment.apiHost + 'subcontractors'

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Subcontractor[]> {
    return this.http.get<any>(this.API_ENDPOINT).pipe(
      map(data => data._embedded?.subcontractors || [])
    );
  }

}
