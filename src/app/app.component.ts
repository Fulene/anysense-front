import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { filter } from "rxjs";

declare var gtag: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class AppComponent {

  constructor(router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-Z1MJ0VGRCX', {
          'page_path': event.urlAfterRedirects
        });
      }
    })
  }

}
