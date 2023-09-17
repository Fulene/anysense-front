import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideRouter, Routes } from "@angular/router";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";
import { AuthGuard } from "./app/shared/guards/AuthGuard";
import { initializeKeycloak } from "./utils/keycloak-init";
import { authInterceptor } from "./app/shared/interceptors/auth-interceptor";
import { CommonModule } from "@angular/common";
import { dashboardRoutes } from "./app/shared/dashboard-routes";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    title: 'welcome',
    // providers: [SubcontractorService],
    loadComponent: () => import('./app/core/components/home/home.component').then(module => module.HomeComponent)
  },
  {
    path: 'test',
    title: 'test',
    loadComponent: () => import('./app/test/test.component').then(module => module.TestComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    title: 'Création de compte',
    loadComponent: () => import('./app/core/components/signup/signup-workflow-wrapper/signup-workflow-wrapper.component').then(module => module.SignupWorkflowWrapperComponent),
  },
  {
    path: 'dashboard',
    title: 'Tableau de bord',
    loadComponent: () => import('./app/core/components/dashboard-wrapper/dashboard-wrapper.component').then(module => module.DashboardWrapperComponent),
    canActivate: [AuthGuard],
    children: dashboardRoutes
  },
  {
    path: '**',
    title: 'Page not found',
    loadComponent: () => import('./app/page-not-found/page-not-found.component').then(module => module.PageNotFoundComponent)
  }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      MatSnackBarModule,
      KeycloakAngularModule,
      CommonModule
    ),
    provideAnimations(),
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ]
})
  .catch(err => console.error(err));
