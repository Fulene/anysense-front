import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from "@angular/router";
import { ButtonComponent } from "../button/button.component";
import { ButtonBisComponent } from "../button-bis/button-bis.component";
import { KeycloakService } from "keycloak-angular";
import { NotificationService } from "../../services/notification.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ButtonComponent, ButtonBisComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isUserLoggedIn?: boolean;

  constructor(
    private router: Router,
    public kcService: KeycloakService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn()
  }

  private isLoggedIn() {
    this.kcService.isLoggedIn()
      .then(value => this.isUserLoggedIn = value)
      .catch(err => {
        console.error(err);
        this.notificationService.showDefaultErrorNotif();
      });
  }

  createAccount() {

  }

  login() {
    this.kcService.login().then(() => this.isLoggedIn())
  }

  logout() {
    this.kcService.logout(environment.appUri).then(() => this.isLoggedIn())
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

}
