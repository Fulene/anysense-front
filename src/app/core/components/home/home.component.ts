import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { environment } from "../../../../environments/environment";
import { SeoService } from "../../../shared/services/seo.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgOptimizedImage],
  styleUrls: ['./home.component.scss']
})
export default class HomeComponent {

  protected readonly environment = environment;

  constructor(private seoService: SeoService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.seoService.setTitleMetaHtml(this.route.data);
  }

}
