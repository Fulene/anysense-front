import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { KeycloakService } from "keycloak-angular";
import { from, mergeMap, Observable } from "rxjs";
import { inject } from "@angular/core";

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const kcService = inject(KeycloakService);
  return from(kcService.getToken()).pipe(
    mergeMap((authToken: string) => {
      if (authToken) {
        const authRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`
          }
        });
        return next(authRequest);
      } else {
        return next(req);
      }
    })
  );
}
