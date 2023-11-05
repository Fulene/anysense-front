import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { SeoService } from "../shared/services/seo.service";

@Component({
  selector: 'app-seotest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seotest.component.html',
  styleUrls: ['./seotest.component.scss']
})
export default class SeotestComponent {

  constructor(private seoService: SeoService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.seoService.setTitleMetaHtml(this.route.data);
  }

}
