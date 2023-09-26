import { KeycloakService } from "keycloak-angular";
import { environment } from "../environments/environment";

export function initializeKeycloak(kcService: KeycloakService) {
    console.log(environment.kcHost, environment.kcRealm, environment.kcClient, environment.apiHost, environment.appUri)
  return () =>
    kcService.init({
      config: {
        url: environment.kcHost,
        realm: environment.kcRealm,
        clientId: environment.kcClient
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: true,
        checkLoginIframeInterval: 25,
        // redirectUri: environment.kcPostLoginRedirectUri
      },
      loadUserProfileAtStartUp: true,
    });
}
