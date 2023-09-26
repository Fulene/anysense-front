import { Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { environment } from "../../../../environments/environment";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    imports: [
        NgOptimizedImage
    ],
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  protected readonly environment = environment;
}
