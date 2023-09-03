import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], imports: [RouterOutlet, NavbarComponent, NgIf],
  standalone: true
})
export class AppComponent implements OnInit {

  showNavbar = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.manageNavbar()
  }

  private manageNavbar() {
    const routesWithNavbar = ['/home', '/test'];
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = routesWithNavbar.includes(event.urlAfterRedirects);
      }
    });
  }

}
