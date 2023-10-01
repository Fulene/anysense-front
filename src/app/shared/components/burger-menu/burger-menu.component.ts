import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-burger-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './burger-menu.component.html',
  styleUrls: ['./burger-menu.component.scss']
})
export class BurgerMenuComponent {
  @Input() isActive = false;
  @Input() disableAnimation = false;
  @Output() onClick = new EventEmitter<any>();

  onBurgerClicked() {
    this.isActive = !this.isActive;
    this.onClick.emit();
  }

}
