import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, PLATFORM_ID } from "@angular/core";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { authInterceptor } from "./shared/interceptors/auth-interceptor";
import { BrowserModule, provideClientHydration } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";
import { CommonModule } from "@angular/common";
import { GoogleTagManagerModule } from "angular-google-tag-manager";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { initializeKeycloak } from "../utils/keycloak-init";
import { KeycloakStateService } from "./shared/services/keycloak-state.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideClientHydration(),
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      MatSnackBarModule,
      KeycloakAngularModule,
      CommonModule,
      GoogleTagManagerModule.forRoot({
        id: 'GTM-5XNTM7BD',
      })
    ),
    provideAnimations(),
    provideRouter(appRoutes),
    {
      provide: APP_INITIALIZER,
      useFactory: (kcService: KeycloakService, platformId: any, keycloakStateService: KeycloakStateService) => initializeKeycloak(kcService, platformId, keycloakStateService),
      multi: true,
      deps: [KeycloakService, PLATFORM_ID, KeycloakStateService]
    }
  ]
}
