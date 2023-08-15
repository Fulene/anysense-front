import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { loggerInterceptor } from "./app/shared/interceptors";
import { provideRouter } from "@angular/router";

import { Routes } from "@angular/router";
import { SubcontractorService } from "./app/subcontractor/services/subcontractor.service";

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
        loadComponent: () => import('./app/home/home.component').then(module => module.HomeComponent)
    }
]

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(withInterceptors([loggerInterceptor])),
        importProvidersFrom(BrowserModule, FormsModule),
        provideAnimations(),
        provideRouter(routes)
    ]
})
  .catch(err => console.error(err));
