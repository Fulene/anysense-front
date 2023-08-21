import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { KeycloakService } from "keycloak-angular";
import { from, mergeMap, Observable } from "rxjs";
import { inject } from "@angular/core";

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  console.log("REQ INITIAL : ", req)
  const kcService = inject(KeycloakService);
  return from(kcService.getToken()).pipe(
    mergeMap((authToken: string) => {
      if (authToken) {
        const authRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`
          }
        });
        console.log("REQ AUTH : ", authRequest)
        return next(authRequest);
      } else {
        console.log("REQ no AUTH : ", req)
        return next(req);
      }
    })
  );
}
