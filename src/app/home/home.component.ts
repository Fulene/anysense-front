import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from "@angular/router";
import { NavbarComponent } from "../shared/components/navbar/navbar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserMailService } from "../temp/user-mail.service";
import { NotificationService } from "../shared/services/notification.service";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { UserMail } from "../temp/user-mail";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, NgOptimizedImage, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userMailService: UserMailService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      mail: ['', [Validators.required, Validators.email]]
    });
  }

  save() {
    if (this.form.valid) {
      const userMail = new UserMail((this.form.get('mail')?.value as string).toLowerCase());
      this.userMailService.save(userMail).subscribe({
        next: () => this.notificationService.showSuccessNotif("C'est enregistré !"),
        error: err => this.notificationService.showErrorNotif(err.error)
      });
    } else
      this.notificationService.showErrorNotif('Veuillez entrer une adresse email valide');
  }

}
