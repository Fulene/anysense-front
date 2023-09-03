import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { AppUser } from "../../../shared/models/app-user";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-profile-selection',
  standalone: true, imports: [CommonModule, NgOptimizedImage, MatIconModule],
  templateUrl: './profile-selection.component.html',
  styleUrls: ['./profile-selection.component.scss']
})
export class ProfileSelectionComponent {
  private profileType = '';

  constructor(private router: Router, public kcService: KeycloakService) {
  }

  onSelectProfileType(profileType: string) {
    this.profileType = profileType;
    this.createAppAccount();
  }

  private createAuthAccount() {
    this.kcService.register().then(() => this.createAppAccount())
  }

  private async createAppAccount() {
    await this.kcService.getToken().then(value => {
      console.log(value);
      const newUser = new AppUser({}); // todo
    });
  }

  login() {
    this.kcService.login().then(() => this.navigateTo('/'))
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

}
