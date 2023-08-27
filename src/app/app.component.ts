import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { NgOptimizedImage } from "@angular/common";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
  imports: [RouterOutlet, RouterLink, NavbarComponent, HomeComponent, NgOptimizedImage]
})
export class AppComponent {
}
