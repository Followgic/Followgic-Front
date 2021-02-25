import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"

export const validarQueSeanIguales: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get("password")
  const confirmarPassword = control.get("re_password")

  return password.value === confirmarPassword.value
    ? null
    : { noSonIguales: true }
}

export const fechaInferiorActual: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const fechaEvento = control.get("fecha_evento")
  const fechaActual = new Date()
  if (fechaEvento.value && typeof fechaEvento.value !== 'string') {
    return (fechaEvento.value.getTime() >= fechaActual.getTime() ||   (fechaEvento.value.getMonth() == fechaActual.getMonth() &&  fechaEvento.value.getDate() == fechaActual.getDate()))
      ? null
      : { noEsMayor: true }
  }
}