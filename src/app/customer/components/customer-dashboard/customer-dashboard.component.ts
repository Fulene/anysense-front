import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MediaMatcher } from "@angular/cdk/layout";
import { MatListModule } from "@angular/material/list";

@Component({
  selector: 'app-customer-dashboard',
  standalone: true, imports: [CommonModule, NgOptimizedImage, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, RouterLink, RouterOutlet],
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  constructor(private router: Router, cdr: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => cdr.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  private readonly _mobileQueryListener: () => void;

  navigateTo(path: string) {
    // this.router.navigate([path]);
  }

    ngOnDestroy() {
        this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    }

}

