import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
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
  // closedSidenavMode = false;
  // @ViewChild('snav') sidenav?: MatSidenav;
  links = [{path: "/path", label: "Entreprises"}, {path: "/", label: "Prestataires"}, {
    path: "/",
    label: "Solutions"
  }, {path: "/", label: "Ressources"},];

  constructor(private router: Router,
              private kcService: KeycloakService,
              private userService: UserService,
              private notificationService: NotificationService,
              cdr: ChangeDetectorRef,
              media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => cdr.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.isLoggedIn();
  }

  private readonly _mobileQueryListener: () => void;

  private isLoggedIn() {
    this.kcService.isLoggedIn().then(value => {
      this.isUserLoggedInKc = value;
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

  logout() {
    this.kcService.logout(environment.appUri).then(() => {
      this.userService.userLogged = undefined;
      this.userLoggedInApp = undefined;
      this.isUserLoggedInKc = false;
    });
  }

  // toggleSidenavMode(): void {
  //   this.closedSidenavMode = !this.closedSidenavMode;
  //   if (this.closedSidenavMode) {
  //     this.sidenav!.close();
  //   } else {
  //     this.sidenav!.open();
  //   }
  // }

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
