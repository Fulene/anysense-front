import { Routes } from "@angular/router";
import { AuthGuard } from "./shared/guards/auth.guard";
import { dashboardRoutes } from "./shared/dashboard-routes";
import { conditionalKcGuard } from "./shared/guards/conditional-kc.guard";

export const appRoutes: Routes = [
  {
    path: '',
    title: 'Accueil',
    // providers: [SubcontractorService],
    loadComponent: () => import('./core/components/home/home.component'),
    data: {
      seo: {
        title: 'Anysense - Mise en relation et Assurance Qualité - IRVE',
        description: 'Plateforme de mise en relation pour installations IRVE. Trouvez les meilleurs partenaires, optimisez votre activité et bénéficiez d\'un accompagnement personnalisé. Rejoignez Anysense aujourd\'hui !'
      }
    }
  },
  {
    path: 'test',
    title: 'Test',
    loadComponent: () => import('./test/test.component'),
    canActivate: [conditionalKcGuard]
  },
  {
    path: 'signup',
    title: 'Création de compte',
    loadComponent: () => import('./core/components/signup/signup-workflow-wrapper/signup-workflow-wrapper.component'),
    data: {
      seo: {
        title: 'Anysense - Inscription',
        description: 'Inscription - Plateforme de mise en relation pour installations IRVE. Trouvez les meilleurs partenaires, optimisez votre activité et bénéficiez d\'un accompagnement personnalisé. Rejoignez Anysense aujourd\'hui !'
      }
    }
  },
  {
    path: 'dashboard',
    title: 'Tableau de bord',
    loadComponent: () => import('./core/components/dashboard-wrapper/dashboard-wrapper.component'),
    canActivate: [conditionalKcGuard],
    children: dashboardRoutes
  },
  {
    path: '**',
    title: 'Page not found',
    loadComponent: () => import('./core/components/not-found/not-found.component')
  }
];
