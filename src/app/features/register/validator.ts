import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchValidator(password: string, confirmPassword: string): ValidatorFn {
  return (passwordGroup: AbstractControl): ValidationErrors | null => {
    const passwordConrol = passwordGroup.get(password);
    const confirmPasswordControl = passwordGroup.get(confirmPassword);

    return passwordConrol &&
      confirmPasswordControl &&
      passwordConrol.value !== confirmPasswordControl.value
      ? { mismatch: true }
      : null;
  };
}
