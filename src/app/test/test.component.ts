import { Component, OnInit } from '@angular/core';
import { KeycloakService } from "keycloak-angular";
import { environment } from "../../environments/environment";
import { Subcontractor } from "../subcontractor/models/subcontractor";
import { Subscription, Unsubscribable } from "rxjs";
import { SubcontractorService } from "../subcontractor/services/subcontractor.service";
import { NotificationService } from "../shared/services/notification.service";
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: 'app-test',
  standalone: true,
  templateUrl: './test.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, Unsubscribable {
  userName?: string
  subcontractors: Subcontractor[] = [];
  private subscription = new Subscription();

  constructor(
    private kcService: KeycloakService,
    private subcontractorService: SubcontractorService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userName = this.kcService.getUsername();
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

  logout() {
    this.kcService.logout(environment.appUri);
  }
}
