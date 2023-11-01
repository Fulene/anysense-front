import { CanActivateFn } from '@angular/router';
import { KeycloakStateService } from "../services/keycloak-state.service";
import { inject } from "@angular/core";
import { AuthGuard } from "./auth.guard";
import { lastValueFrom, take } from "rxjs";

export const conditionalKcGuard: CanActivateFn = async (route, state) => {
  const kcStateService: KeycloakStateService = inject(KeycloakStateService);
  const authGuard: AuthGuard = inject(AuthGuard);

  const isInitialized = await lastValueFrom(kcStateService.isInitialized.pipe(take(1)));
  if (!isInitialized) return false;
  else return authGuard.canActivate(route, state);
};
