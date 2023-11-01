import { KeycloakService } from "keycloak-angular";
import { environment } from "../environments/environment";
import { isPlatformBrowser } from "@angular/common";
import { KeycloakStateService } from "../app/shared/services/keycloak-state.service";

export function initializeKeycloak(kcService: KeycloakService, platformId: any, kcStateService: KeycloakStateService) {
    return async () => {  // rendre cette fonction asynchrone
        if (isPlatformBrowser(platformId)) {
            await kcService.init({   // attendre que la méthode init soit terminée
                config: {
                    url: environment.kcHost,
                    realm: environment.kcRealm,
                    clientId: environment.kcClient
                },
                initOptions: {
                    onLoad: 'check-sso',
                    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
                    checkLoginIframe: true,
                    checkLoginIframeInterval: 25,
                },
                loadUserProfileAtStartUp: true,
            });
            kcStateService.setInitialized(true);
        }
    };
}
