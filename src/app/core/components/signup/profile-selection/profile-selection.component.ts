import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { ProfileType } from "../../../../shared/models/enums/profile-type";

@Component({
  selector: 'app-profile-selection',
  standalone: true, imports: [CommonModule, NgOptimizedImage, MatIconModule],
  templateUrl: './profile-selection.component.html',
  styleUrls: ['./profile-selection.component.scss']
})
export class ProfileSelectionComponent {
  @Output() onSelectProfileType = new EventEmitter<ProfileType>();
  profileType = ProfileType;

  constructor(private router: Router, public kcService: KeycloakService) {
  }

  onSelect(profileType: ProfileType) {
    this.onSelectProfileType.emit(profileType);
  }

  login() {
    this.kcService.login().then(() => this.router.navigate(['/']));
  }

}
