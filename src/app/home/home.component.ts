import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from "../../environments/environment";
import { Subcontractor } from "../subcontractor/models/subcontractor";
import { SubcontractorService } from "../subcontractor/services/subcontractor.service";
import { Subscription, Unsubscribable } from "rxjs";
import { NotificationService } from "../shared/services/notification.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, Unsubscribable {
  apiHost?: string;
  subcontractors: Subcontractor[] = [];
  private subscription = new Subscription();

  constructor(private subcontractorService: SubcontractorService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.apiHost = environment.apiHost;
    this.initDataTest();
  }

  private initDataTest(): void {
    this.subscription.add(
      this.subcontractorService.findAll().subscribe({
        next: value => this.subcontractors = value,
        error: err => console.log(err)
      })
    );
  }

  unsubscribe(): void {
    this.subscription.unsubscribe();
  }

  onTest() {
    this.notificationService.showErrorNotif("Les notifs fonctionnent !", true);
  }
}
