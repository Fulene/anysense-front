import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MediaMatcher } from "@angular/cdk/layout";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BurgerMenuComponent } from "../burger-menu/burger-menu.component";
import { ButtonBisComponent } from "../button-bis/button-bis.component";
import { environment } from "../../../../environments/environment";
import { KeycloakService } from "keycloak-angular";
import { UserService } from "../../services/user.service";
import { fromEvent, map, Observable, startWith, Subscription } from "rxjs";

@Component({
  selector: 'app-base-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule, NgOptimizedImage, RouterLink, RouterLinkActive, RouterOutlet, BurgerMenuComponent, ButtonBisComponent],
  templateUrl: './base-dashboard.component.html',
  styleUrls: ['./base-dashboard.component.scss']
})
export class BaseDashboardComponent implements OnInit, OnDestroy {
  @Input() links: Array<{ path: string, label: string, icon: string }> = [];
  @ViewChild('snav') sidenav?: MatSidenav;

  closedSidenavMode = false;
  mediaSubscription: Subscription;
  isMobileMode: boolean = true;

  constructor (private router: Router,
              cdr: ChangeDetectorRef,
              media: MediaMatcher,
              private kcService: KeycloakService,
              private userService: UserService) {
    this.mediaSubscription = this.media('(max-width: 768px)').subscribe((matches) =>
      this.isMobileMode = matches
    );
  }

  ngOnInit(): void {
    if (!this.links.length) {
      console.warn('Pas de liens fournis pour BaseDashboardComponent');
    } else {
      this.navigateTo(this.links[0].path);
    }

    if (this.isMobileMode) {
      this.closedSidenavMode = true;
    }
  }

  logout() {
    this.kcService.logout(environment.appUri).then(() => {
      this.userService.userLogged = undefined;
    });
  }

  media(query: string): Observable<boolean> {
    const mediaQuery = window.matchMedia(query);
    return fromEvent<MediaQueryList>(mediaQuery, 'change').pipe(
      startWith(mediaQuery),
      map((list: MediaQueryList) => list.matches)
    );
  }

  toggleSidenavMode(): void {
    this.closedSidenavMode = !this.closedSidenavMode;
    if (this.closedSidenavMode) {
      this.sidenav!.close();
    } else {
      this.sidenav!.open();
    }
  }

  onSnavClosed() {
    this.closedSidenavMode = true
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  ngOnDestroy(): void {
    this.mediaSubscription.unsubscribe();
  }

}
