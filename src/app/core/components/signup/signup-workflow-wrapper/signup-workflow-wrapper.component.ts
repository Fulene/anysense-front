import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProfileSelectionComponent } from "../profile-selection/profile-selection.component";
import { ActivatedRoute, Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { ProfileType } from "../../../../shared/models/enums/profile-type";
import { CustomerProfile } from "../../../../customer/models/customer-profile";
import { ContractorProfile } from "../../../../contractor/models/contractor-profile";
import { environment } from "../../../../../environments/environment";
import { UserProfile } from "../../../../shared/models/user-profile";
import { SeoService } from "../../../../shared/services/seo.service";

@Component({
  selector: 'app-signup-workflow',
  standalone: true,
  imports: [CommonModule, ProfileSelectionComponent, NgOptimizedImage],
  templateUrl: './signup-workflow-wrapper.component.html',
  styleUrls: ['./signup-workflow-wrapper.component.scss']
})
export default class SignupWorkflowWrapperComponent implements OnInit {
  profile?: UserProfile;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private seoService: SeoService,
    public kcService: KeycloakService) {
  }

  ngOnInit(): void {
    this.seoService.setTitleMetaHtml(this.route.data);
  }

  onSelectProfileType(profileType: ProfileType) {
    this.profile = profileType === ProfileType.CUSTOMER ? new CustomerProfile() : new ContractorProfile();
    this.createAuthAccountIfNeeded();
  }

  private createAuthAccountIfNeeded() {
    localStorage.setItem('appUserProfileTemp', JSON.stringify(this.profile));
    this.kcService.isLoggedIn().then(value => {
      if (!value) this.kcService.register({redirectUri: environment.kcPostLoginRedirectUri}); else this.navigateTo("/dashboard");
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

}
