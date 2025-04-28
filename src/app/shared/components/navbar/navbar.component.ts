import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ButtonComponent } from "../button/button.component";
import { ButtonBisComponent } from "../button-bis/button-bis.component";
import { KeycloakService } from "keycloak-angular";
import { NotificationService } from "../../services/notification.service";
import { environment } from "../../../../environments/environment";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";
import { AppUser } from "../../models/app-user";
import { MediaMatcher } from "@angular/cdk/layout";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatExpansionModule } from "@angular/material/expansion";
import { BurgerMenuComponent } from "../burger-menu/burger-menu.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ButtonComponent, ButtonBisComponent, MatSidenavModule, MatButtonModule, MatIconModule, MatListModule, RouterLinkActive, RouterLink, MatToolbarModule, MatExpansionModule, BurgerMenuComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  isLoading = true;
  isUserLoggedInKc?: boolean;
  userLoggedInApp?: AppUser;
  mobileQuery: MediaQueryList;
  test = true
  links = [{path: "/test", label: "Entreprises"}, {path: "/", label: "Prestataires"}, {
    path: "/",
    label: "Solutions"
  }, {path: "/", label: "Ressources"},];

  constructor(private router: Router,
    private kcService: KeycloakService,
    private userService: UserService,
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef,
    media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this.mobileQuery.onchange = () => cdr.detectChanges();
  }

  ngOnInit(): void {
    this.isLoggedIn();
  }

  private isLoggedIn() {
    this.kcService.isLoggedIn().then(value => {
      this.isUserLoggedInKc = value;
      this.test = false
      if (this.isUserLoggedInKc) {
        const kcId = this.kcService.getKeycloakInstance().profile!.id!;
        this.subscription.add(this.userService.getUserLogged(kcId).subscribe({
          next: appUser => {
            if (appUser) this.userLoggedInApp = appUser;
            this.isLoading = false;
          }, error: err => this.onErrorHttp(err)
        }));
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

  navigateTo(path: string) {
    this.isLoading = true;
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
