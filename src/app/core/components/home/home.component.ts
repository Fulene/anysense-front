import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { environment } from "../../../../environments/environment";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgOptimizedImage],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  protected readonly environment = environment;

  constructor(
      private titleService: Title,
      private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Anysense - Mise en relation et Assurance Qualité PLUG');
    this.metaService.updateTag({ name: 'title', content: 'Anysense - Mise en relation et Assurance Qualité PLUG' });
    this.metaService.updateTag({ name: 'description', content: 'Plateforme de mise en relation pour installations IRVE. Trouvez les meilleurs partenaires, optimisez votre activité et bénéficiez d\'un accompagnement personnalisé. Rejoignez Anysense aujourd\'hui !' });
  }

}
