import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() label?: string;
  @Input() theme?: string;
  @Input() matIcon?: string;
  @Input() disabled = false;
  @Input() loading = false;
  @Output() onClick = new EventEmitter<void>();

  onClicked() {
    if (!this.disabled && !this.loading) this.onClick.emit();
  }

}
