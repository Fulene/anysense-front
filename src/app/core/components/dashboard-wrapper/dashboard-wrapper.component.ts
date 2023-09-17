import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { UserService } from "../../../shared/services/user.service";
import { NotificationService } from "../../../shared/services/notification.service";
import { AppUser } from "../../../shared/models/app-user";
import { KeycloakProfile } from "keycloak-js";
import { Subscription } from "rxjs";
import { UserProfile } from "../../../shared/models/user-profile";
import { ProfileType } from "../../../shared/models/enums/profile-type";
import {
  CustomerDashboardComponent
} from "../../../customer/components/customer-dashboard/customer-dashboard.component";
import {
  ContractorDashboardComponent
} from "../../../contractor/components/contractor-dashboard/contractor-dashboard.component";

@Component({
  selector: 'app-dashboard-wrapper',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, CustomerDashboardComponent, ContractorDashboardComponent],
  templateUrl: './dashboard-wrapper.component.html',
  styleUrls: ['./dashboard-wrapper.component.scss']
})
export class DashboardWrapperComponent implements OnInit, OnDestroy {
  readonly ProfileType = ProfileType;
  appUser?: AppUser;
  kcProfile?: KeycloakProfile;
  isLoading = false;
  private subscription = new Subscription();

  constructor(private router: Router, public kcService: KeycloakService, private userService: UserService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.manageUser();
  }

  private manageUser(): void {
    this.isLoading = true;
    this.kcProfile = this.kcService.getKeycloakInstance().profile;
    this.subscription.add(this.userService.getUserLogged(this.kcProfile!.id!).subscribe({
      next: appUser => {
        if (appUser) {
          this.appUser = appUser;
          this.isLoading = false;
        } else this.newUserProcess();
      }, error: err => this.onErrorOccurred(err)
    }));
  }

  private newUserProcess() {
    const appUserProfileTempJson = localStorage.getItem('appUserProfileTemp');
    if (appUserProfileTempJson) {
      let userProfile = JSON.parse(appUserProfileTempJson) as UserProfile;
      const newAppUser = this.initNewAppUser(userProfile);
      this.subscription.add(this.userService.createAppAccount(newAppUser).subscribe({
        next: appUser => this.appUser = appUser, error: err => this.onErrorOccurred(err), complete: () => {
          this.isLoading = false;
          localStorage.removeItem('appUserProfileTemp');
        }
      }));
    } else this.onErrorOccurred("Profile introuvable");
  }

  private initNewAppUser(userProfile: UserProfile): AppUser {
    const appUser = new AppUser();
    appUser.kcId = this.kcProfile!.id!;
    appUser.firstname = this.kcProfile!.firstName;
    appUser.lastname = this.kcProfile!.lastName;
    appUser.email = this.kcProfile!.email;
    appUser.profiles.push(userProfile);
    return appUser;
  }

  isProfile(profileType: ProfileType) {
    return this.appUser && this.appUser.profiles.length && this.appUser.profiles[0].type === profileType;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  private onErrorOccurred(err: string) {
    this.notificationService.showDefaultErrorNotif();
    console.error(err);
    this.navigateTo("/");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
