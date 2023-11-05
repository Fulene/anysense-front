import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { isPlatformBrowser, NgIf } from "@angular/common";
import { GoogleTagManagerService } from "angular-google-tag-manager";
import Hotjar from "@hotjar/browser";
import { environment } from "../environments/environment";
import { Meta, Title } from "@angular/platform-browser";
import { KeycloakService } from "keycloak-angular";

declare let hj: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterOutlet, NavbarComponent, NgIf],
    standalone: true
})
export class AppComponent {

    showNavbar = true;

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private gtmService: GoogleTagManagerService,
        private titleService: Title,
        private metaService: Meta,
        @Inject(PLATFORM_ID) private readonly platformId: any) {
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) this.onAppInit();
    }

    private onAppInit() {
        if (environment.label === 'prod' || environment.label === 'staging')
            Hotjar.init(environment.hjSiteId, environment.hjVersion);

        const routesWithNavbar = ['/', '/test'];

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.showNavbar = routesWithNavbar.includes(event.urlAfterRedirects);
                const gtmTag = {
                    event: 'page', pageName: event.url
                };

                this.gtmService.pushTag(gtmTag);

                if (typeof hj === 'function') {
                    hj('stateChange', event.url);
                }
            }
        });
    }

}
