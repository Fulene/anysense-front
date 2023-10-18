import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { NgIf } from "@angular/common";
import { GoogleTagManagerService } from "angular-google-tag-manager";
import Hotjar from "@hotjar/browser";
import { environment } from "../environments/environment";

declare let hj: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], imports: [RouterOutlet, NavbarComponent, NgIf],
  standalone: true
})
export class AppComponent implements OnInit {

  showNavbar = true;

  constructor(private router: Router, private gtmService: GoogleTagManagerService) {
  }

  ngOnInit(): void {
    this.onAppInit()
  }

  private onAppInit() {
    Hotjar.init(environment.hjSiteId, environment.hjVersion);
    const routesWithNavbar = ['/home', '/test'];

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = routesWithNavbar.includes(event.urlAfterRedirects);
        const gtmTag = {
          event: 'page',
          pageName: event.url
        };

        this.gtmService.pushTag(gtmTag);

        if (typeof hj === 'function') {
          hj('stateChange', event.url);
        }
      }
    });
  }

}
