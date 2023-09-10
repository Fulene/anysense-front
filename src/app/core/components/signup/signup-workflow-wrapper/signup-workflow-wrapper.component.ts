import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProfileSelectionComponent } from "../profile-selection/profile-selection.component";
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { ProfileType } from "../../../../shared/models/enums/profile-type";
import { CustomerProfile } from "../../../../customer/models/customer-profile";
import { ContractorProfile } from "../../../../contractor/models/contractor-profile";
import { UserService } from "../../../../shared/services/user.service";
import { NotificationService } from "../../../../shared/services/notification.service";
import { environment } from "../../../../../environments/environment";
import { Subscription } from "rxjs";
import { UserProfile } from "../../../../shared/models/user-profile";

@Component({
    selector: 'app-signup-workflow',
    standalone: true,
    imports: [CommonModule, ProfileSelectionComponent, NgOptimizedImage],
    templateUrl: './signup-workflow-wrapper.component.html',
    styleUrls: ['./signup-workflow-wrapper.component.scss']
})
export class SignupWorkflowWrapperComponent implements OnInit {
    profile?: UserProfile;

    constructor(private router: Router, public kcService: KeycloakService, private userService: UserService, private notificationService: NotificationService) {
    }

    ngOnInit(): void {
    }

    onSelectProfileType(profileType: ProfileType) {
        this.profile = profileType === ProfileType.CUSTOMER ? new CustomerProfile() : new ContractorProfile();
        this.createAuthAccountIfNeeded();
    }

    private createAuthAccountIfNeeded() {
        localStorage.setItem('appUserProfileTemp', JSON.stringify(this.profile));
        this.kcService.isLoggedIn().then(value => {
            if (!value) this.kcService.register({redirectUri: environment.kcPostLoginRedirectUri});
            else this.navigateTo("/dashboard-wrapper");
        });
    }

    navigateTo(path: string) {
        this.router.navigate([path]);
    }

}
