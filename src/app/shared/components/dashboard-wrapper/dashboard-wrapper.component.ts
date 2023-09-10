import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { UserService } from "../../services/user.service";
import { NotificationService } from "../../services/notification.service";
import { AppUser } from "../../models/app-user";
import { KeycloakProfile } from "keycloak-js";
import { Subscription } from "rxjs";
import { UserProfile } from "../../models/user-profile";
import { ProfileType } from "../../models/enums/profile-type";

@Component({
    selector: 'app-dashboard-wrapper',
    standalone: true, imports: [CommonModule, NgOptimizedImage],
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
        this.subscription.add(
            this.userService.getUserLogged(this.kcProfile!.id!).subscribe({
                next: appUser => {
                    if (appUser) {
                        this.appUser = appUser;
                        this.isLoading = false;
                    } else this.newUserProcess();
                }, error: err => this.onErrorOccurred(err)
            })
        );
    }

    private newUserProcess() {
        const appUserProfileTempJson = localStorage.getItem('appUserProfileTemp');
        if (appUserProfileTempJson) {
            let userProfile = JSON.parse(appUserProfileTempJson) as UserProfile;
            const newAppUser = this.initNewAppUser(userProfile);
            this.subscription.add(
                this.userService.createAppAccount(newAppUser).subscribe({
                    next: appUser => this.appUser = appUser,
                    error: err => this.onErrorOccurred(err),
                    complete: () => {
                        this.isLoading = false;
                        localStorage.removeItem('appUserProfileTemp');
                    }
                })
            );
        } else this.onErrorOccurred("Profile introuvable");
    }
    // http://localhost:8089/realms/anysense-realm/protocol/openid-connect/auth?client_id=anysense-front&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fdashboard-wrapper&state=d920c875-6b4a-4b29-8802-ddcfe08302d5&response_mode=fragment&response_type=code&scope=openid&nonce=3d657494-3005-4835-8885-8995befb0ee4

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
