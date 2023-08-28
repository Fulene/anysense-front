import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppComponent } from './app.component';
import { provideClientHydration } from "@angular/platform-browser";
import { KeycloakService } from "keycloak-angular";
import { NotificationService } from "./shared/services/notification.service";
import { MatSnackBarModule } from "@angular/material/snack-bar"; // Enable Client Hydration

@NgModule({
  imports: [
    ServerModule,
    MatSnackBarModule
  ],
  providers: [ provideClientHydration(), KeycloakService, NotificationService ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
