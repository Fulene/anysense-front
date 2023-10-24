import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from "@angular/forms";
import { UserMailService } from "../temp/user-mail.service";
import { NotificationService } from "../shared/services/notification.service";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Anysense - A propos de nous');
    this.metaService.updateTag({ name: 'title', content: 'Anysense - A propos de nous' });
    this.metaService.updateTag({ name: 'description', content: 'Explorez notre page \'À propos\' pour en savoir plus sur notre entreprise. Découvrez notre histoire, notre mission et notre équipe passionnée. Nous sommes déterminés à fournir des informations de qualité et un service exceptionnel à nos clients. Apprenez-en davantage sur notre engagement envers l\'excellence et notre vision pour l\'avenir' });
  }

}
