import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-button-bis',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './button-bis.component.html',
  styleUrls: ['./button-bis.component.scss']
})
export class ButtonBisComponent {

  @Input() label?: string;
  @Input() theme?: string;
  @Input() matIcon?: string;
  @Input() disabled = false;
  @Input() loading = false;
  @Output() onClick = new EventEmitter<void>();

  onClicked() {
    if (!this.disabled) this.onClick.emit();
  }

}
