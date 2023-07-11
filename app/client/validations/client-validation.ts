import { isNumeric } from "../functions/client-functions"
import { IClientValidation } from "../interfaces/client-interfaces"



export const clientValidation: IClientValidation = {
  ci: (value: string) =>
    !isNumeric(value)
      ? "C.I must be a number string"
      : value.length !== 10
      ? "C.I must have 10 numbers"
      : null,
  firstName: (value: string) =>
    value.length < 1
      ? "First Name must have at least 1 letter"
      : null,
  lastName: (value: string) =>
    value.length < 3
      ? "First Name must have at least 3 letter"
      : null,
  oxygenPercent: (value: number) =>
    value === undefined
      ? "Oxygen Percent is required"
      : value < 0
      ? "Oxygen Percent must be between 0 and 100"
      : value > 100
      ? "Oxygen Percent must be between 0 and 100"
      : null,
  fatPercent: (value: number) =>
    value === undefined
      ? "Fat Percent is required"
      : value < 0
      ? "Fat Percent must be between 0 and 100"
      : value > 100
      ? "Fat Percent must be between 0 and 100"
      : null,
  sugarPercent: (value: number) =>
    value === undefined
      ? "Sugar Percent is required"
      : value < 0
      ? "Sugar Percent must be between 0 and 100"
      : value > 100
      ? "Sugar Percent must be between 0 and 100"
      : null,
}
