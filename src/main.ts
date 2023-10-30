import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication, BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideRouter, Routes } from "@angular/router";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";
// import { initializeKeycloak } from "src/utils/keycloak-init";
import { AuthGuard } from "./app/shared/guards/AuthGuard";
import { initializeKeycloak } from "./utils/keycloak-init";
import { authInterceptor } from "./app/shared/interceptors/auth-interceptor";

const routes: Routes = [
  {
    path: '',
    title: 'Welcome',
    loadComponent: () => import('./app/home/home.component')
  },
  {
    path: 'about',
    title: 'About',
    loadComponent: () => import('./app/about/about.component')
  },
  {
    path: '**',
    title: 'Page not found',
    loadComponent: () => import('./app/page-not-found/page-not-found.component')
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      MatSnackBarModule,
      KeycloakAngularModule
    ),
    provideAnimations(),
    provideRouter(routes),
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps: [KeycloakService]
    // }
  ]
})
  .catch(err => console.error(err));
