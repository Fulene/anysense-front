import { Injectable } from '@angular/core';
import { BaseEntityService } from "./base-entity-service";
import { AppUser } from "../models/app-user";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of, tap } from "rxjs";
import { KeycloakService } from "keycloak-angular";
import { NotificationService } from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseEntityService<AppUser> {
  public userLogged$ = new BehaviorSubject<AppUser | null>(null);


  constructor(
    protected override http: HttpClient,
    private kcService: KeycloakService,
    private notificationService: NotificationService
  ) {
    super('user', http);
  }


  public getUserLogged(kcId: string): Observable<AppUser> {
    const cachedUser = this.userLogged$.getValue();

    if (cachedUser && cachedUser.kcId === kcId) {
      return of(cachedUser);
    } else {
      return this.http.get<AppUser>(this.API_ENDPOINT + '/auth-id/' + kcId).pipe(
        tap(user => this.userLogged$.next(user))
      );
    }
  }

  public createAppAccount(newUser: AppUser) {
    this.kcService.getToken().then(token => {
      this.http.post<AppUser>(this.API_ENDPOINT, newUser).subscribe({
        next: value => {
          this.userLogged$.next(value);
          // todo => redirect to dashboard
        },
        error: err => {
          this.notificationService.showDefaultErrorNotif();
          console.error(err);
        }
      })
    });
  }

}
