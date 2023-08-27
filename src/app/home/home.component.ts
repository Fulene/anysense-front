import { Component } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";

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

}
