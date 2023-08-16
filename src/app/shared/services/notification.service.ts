import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {}

  private showNotification(text: string, eventType: 'info' | 'success' | 'error' | 'alert', disableDuration?: boolean): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(text, 'x', {
      duration: disableDuration ? undefined : 3000,
      panelClass: eventType,
    });
  }

  public showSuccessNotif(text: string, disableDuration?: boolean): MatSnackBarRef<TextOnlySnackBar> {
    return this.showNotification(text, 'success', disableDuration);
  }

  public showErrorNotif(text: string, disableDuration?: boolean): MatSnackBarRef<TextOnlySnackBar> {
    return this.showNotification(text, 'error', disableDuration);
  }

  public showInfosNotif(text: string, disableDuration?: boolean): MatSnackBarRef<TextOnlySnackBar> {
    return this.showNotification(text, 'info', disableDuration);
  }

  public showAlertNotif(text: string, disableDuration?: boolean): MatSnackBarRef<TextOnlySnackBar> {
    return this.showNotification(text, 'alert', disableDuration);
  }

  public showDefaultErrorNotif(disableDuration?: boolean): MatSnackBarRef<TextOnlySnackBar> {
    return this.showNotification('Une erreur est survenue', 'error', disableDuration);
  }

}
