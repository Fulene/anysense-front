import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { MediaMatcher } from "@angular/cdk/layout";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BaseDashboardComponent } from "../../../shared/components/base-dashboard/base-dashboard.component";

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, RouterLink, RouterOutlet, MatToolbarModule, RouterLinkActive, BaseDashboardComponent],
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent {

  links = [
    { path: '/dashboard/customer/test1', label: 'Test 1', icon: 'home' },
    { path: '/dashboard/customer/test2', label: 'Test 2', icon: 'home' },
  ];

}

