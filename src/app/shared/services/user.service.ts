import { Injectable } from '@angular/core';
import { BaseEntityService } from "./base-entity-service";
import { AppUser } from "../models/app-user";
import { HttpClient } from "@angular/common/http";
import { Observable, of, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseEntityService<AppUser> {
  public userLogged?: AppUser;


  constructor(protected override http: HttpClient) {
    super('users', http);
  }


  public getUserLogged(kcId: string): Observable<AppUser> {
    if (this.userLogged && this.userLogged.kcId === kcId) {
      return of(this.userLogged);
    } else return this.loginApp(kcId);
  }

  public loginApp(kcId: string): Observable<AppUser> {
      return this.http.get<AppUser>(this.API_ENDPOINT + '/auth-id/' + kcId).pipe(
          tap(user => {
              this.userLogged = user;
          })
      );
  }

  public createAppAccount(newUser: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(this.API_ENDPOINT, newUser).pipe(
        tap(user => {
          this.userLogged = user;
        })
    )
  }

}
