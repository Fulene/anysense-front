import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KeycloakStateService {
  isInitialized = new BehaviorSubject<boolean>(false);

  setInitialized(value: boolean): void {
    this.isInitialized.next(value);
  }
}
