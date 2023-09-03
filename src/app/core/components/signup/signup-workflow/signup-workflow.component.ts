import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProfileSelectionComponent } from "../profile-selection/profile-selection.component";
import { AppUser } from "../../../../shared/models/app-user";
import { Router } from "@angular/router";
import { KeycloakService } from "keycloak-angular";
import { ProfileType } from "../../../../shared/models/enums/profile-type";
import { CustomerProfile } from "../../../../customer/models/customer-profile";
import { ContractorProfile } from "../../../../contractor/models/contractor-profile";
import { UserService } from "../../../../shared/services/user.service";
import { NotificationService } from "../../../../shared/services/notification.service";

@Component({
  selector: 'app-signup-workflow',
  standalone: true, imports: [CommonModule, ProfileSelectionComponent, NgOptimizedImage],
  templateUrl: './signup-workflow.component.html',
  styleUrls: ['./signup-workflow.component.scss']
})
export class SignupWorkflowComponent implements OnInit {
  newUser!: AppUser;

  constructor(
    private router: Router,
    public kcService: KeycloakService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.newUser = new AppUser();
  }

  onSelectProfileType(profileType: ProfileType) {
    this.newUser.profiles.push(profileType === ProfileType.CUSTOMER ? new CustomerProfile() : new ContractorProfile());
    this.createAuthAccountIfNeeded();
  }

  private createAuthAccountIfNeeded() {
    this.kcService.isLoggedIn().then(value => {
      if (!value)
        this.kcService.register().then(() => {
          this.kcService.getToken().then(token => {
            console.log(token);
            // todo => complete newUser with token data
            this.userService.createAppAccount(this.newUser);
          });
        });
      else
        this.kcService.getToken().then(token => {
          console.log(token);
          // todo => token.getSubject...
          this.userService.getUserLogged(token).subscribe({
            next: value => {
              if (value)
                this.userService.userLogged$.next(value);
                // todo => redirect to dashboard
              else
                // todo => complete newUser with token data
                this.userService.createAppAccount(this.newUser);
            },
            error: err => {
              this.notificationService.showDefaultErrorNotif();
              console.error(err);
            }
          })
        });
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

}
