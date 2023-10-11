import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgOptimizedImage],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  protected readonly environment = environment;
}
