import { Component, OnInit } from '@angular/core';
import { KeycloakService } from "keycloak-angular";
import { environment } from "../../environments/environment";
import { Subscription, Unsubscribable } from "rxjs";
import { NotificationService } from "../shared/services/notification.service";
import { JsonPipe, NgForOf, NgIf } from "@angular/common";
import { AppUser } from "../shared/models/app-user";
import { UserService } from "../shared/services/user.service";

@Component({
  selector: 'app-test',
  standalone: true,
  templateUrl: './test.component.html', imports: [NgIf, NgForOf, JsonPipe],
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, Unsubscribable {
  userName?: string
  users: AppUser[] = [];
  private subscription = new Subscription();

  constructor(
    private kcService: KeycloakService,
    public userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userName = this.kcService.getUsername();
    this.initDataTest();
  }

  private initDataTest(): void {
    this.subscription.add(
      this.userService.findAll().subscribe({
        next: value => this.users = value,
        error: err => console.error(err)
      })
    );
  }

  unsubscribe(): void {
    this.subscription.unsubscribe();
  }

  onTest() {
    this.notificationService.showErrorNotif("Les notifs fonctionnent !", true);
  }

  logout() {
    this.kcService.logout(environment.appUri);
  }
}
