import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UserMail } from "./user-mail";

@Injectable({
  providedIn: 'root'
})
export class UserMailService {
  private API_ENDPOINT = environment.apiHost + 'pub/newsletter'

  constructor(private http: HttpClient) { }

  public save(mail: UserMail): Observable<any> {
    return this.http.post<any>(this.API_ENDPOINT, mail);
  }

}
