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

@Component({
  selector: 'app-base-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule, NgOptimizedImage, RouterLink, RouterLinkActive, RouterOutlet, BurgerMenuComponent],
  templateUrl: './base-dashboard.component.html',
  styleUrls: ['./base-dashboard.component.scss']
})
export class BaseDashboardComponent implements OnInit, OnDestroy {
  @Input() links: Array<{ path: string, label: string, icon: string }> = [];
  mobileQuery: MediaQueryList;
  closedSidenavMode = false;
  @ViewChild('snav') sidenav?: MatSidenav;

  constructor(private router: Router, cdr: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => cdr.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    if (!this.links.length) {
      console.warn('Pas de liens fournis pour BaseDashboardComponent');
    } else {
      this.navigateTo(this.links[0].path);
    }

    if (this.mobileQuery.matches) {
      this.closedSidenavMode = true;
    }
  }

  private readonly _mobileQueryListener: () => void;

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
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

}
