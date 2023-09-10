import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from "@angular/router";
import { ButtonComponent } from "../button/button.component";
import { ButtonBisComponent } from "../button-bis/button-bis.component";
import { KeycloakService } from "keycloak-angular";
import { NotificationService } from "../../services/notification.service";
import { environment } from "../../../../environments/environment";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";
import { AppUser } from "../../models/app-user";

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, NgOptimizedImage, ButtonComponent, ButtonBisComponent],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    subscription = new Subscription();
    isLoading = true;
    isUserLoggedInKc?: boolean;
    userLoggedInApp?: AppUser;

    constructor(private router: Router, private kcService: KeycloakService, private userService: UserService, private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.isLoggedIn();
    }

    private isLoggedIn() {
        this.kcService.isLoggedIn().then(value => {
            this.isUserLoggedInKc = value;
            if (this.isUserLoggedInKc) {
                const kcId = this.kcService.getKeycloakInstance().profile!.id!;
                this.subscription.add(
                    this.userService.getUserLogged(kcId).subscribe({
                        next: appUser => {
                            if (appUser) this.userLoggedInApp = appUser;
                            this.isLoading = false;
                        },
                        error: err => this.onErrorHttp(err)
                    })
                );
            } else {
                this.isLoading = false;
            }
        }).catch(err => {
            this.onErrorHttp(err);
        });
    }

    login() {
        this.kcService.login({redirectUri: environment.kcPostLoginRedirectUri});
    }

    logout() {
        this.kcService.logout(environment.appUri).then(() => {
            this.userService.userLogged = undefined;
            this.userLoggedInApp = undefined;
            this.isUserLoggedInKc = false;
        });
    }

    navigateTo(path: string) {
        this.router.navigate([path]);
    }

    private onErrorHttp(err: string) {
        this.notificationService.showDefaultErrorNotif();
        console.error(err);
        this.isLoading = false;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
