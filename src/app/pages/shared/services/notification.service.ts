import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Actions } from '../actions.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastrService: NbToastrService) { }

  /**
   * Shows a Toast based on data received from the server.
   *
   * @param status = 'success' || 'danger' (string)
   * @param type = Create, Edit or Delete (Actions enum)
   * @param entity = Employee, role, team, project etc.(string)
   * @param duration = time notification stays on screen (number)
   * @param message = response.message || showErrorMessage() (string)
   */
  public showToast(status, entity, type, duration, message?): void {
    const action: string = this.checkAction(type);
    entity = entity.charAt(0).toUpperCase() + entity.slice(1);
    if (status === 'success') {
      this.toastrService.show(
        `${entity} has been ${action} successfully!`,
        'Success', { status, duration });
      } else {
        this.toastrService.show(
          `${message}`,
          'Error', { status, duration });
    }
  }

  /**
   * Chooses what error message to display from the server.
   * Called from addEntity() or editEntity().
   *
   * @param defaultError = err.error.message string
   * @param specificErrorsArray = err.error.errors array
   */
  public showErrorMessage(defaultError, specificErrorsArray): string {
    let message: string = defaultError;
    const errorNames = Object.keys(specificErrorsArray);
    if (errorNames.length > 0) {
      message = '';
      for (let i = 0; i < errorNames.length; i++) {
        message += specificErrorsArray[errorNames[i]][0];
      }
    }
    return message;
  }

  /**
   * Checks what kind of notification message should be displayed.
   *
   * @param action = Create||Edit|| Delete (Actions enum)
   */
  private checkAction(action): string {
    switch (action) {
      case Actions.Create:
        return 'added';
      case Actions.Edit:
        return 'updated';
      case Actions.Delete:
        return 'deleted';
    }
  }

}
