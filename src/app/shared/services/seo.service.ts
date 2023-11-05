import { Injectable } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";
import { ActivatedRoute, Data } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private titleService: Title, private metaService: Meta) {}

  setTitleMetaHtml(routeData: Observable<Data>) {
    routeData.subscribe((data: any) => {
      this.titleService.setTitle(data.seo.title)
      this.metaService.updateTag({name: 'description', content: data.seo.description});
    });
  }
}
