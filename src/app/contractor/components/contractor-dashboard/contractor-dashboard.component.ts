import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseDashboardComponent } from "../../../shared/components/base-dashboard/base-dashboard.component";

@Component({
  selector: 'app-contractor-dashboard',
  standalone: true, imports: [CommonModule, BaseDashboardComponent],
  templateUrl: './contractor-dashboard.component.html',
  styleUrls: ['./contractor-dashboard.component.scss']
})
export class ContractorDashboardComponent {

  links = [
    { path: '/dashboard/contractor/test1', label: 'Test 1', icon: 'home' },
    { path: '/dashboard/contractor/test2', label: 'Test 2', icon: 'home' },
  ];

}
