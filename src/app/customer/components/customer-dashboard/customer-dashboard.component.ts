import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { MediaMatcher } from "@angular/cdk/layout";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, RouterLink, RouterOutlet, MatToolbarModule, RouterLinkActive],
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  closedSidenavMode = false;
  @ViewChild('snav') sidenav?: MatSidenav;

  constructor(private router: Router, cdr: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => cdr.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.navigateTo("/dashboard/test1");
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

  ngOnDestroy() {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

}

