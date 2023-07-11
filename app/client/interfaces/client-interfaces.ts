import { IClient } from "@/app/interfaces/interfaces"

export interface IValues extends IClient {
  action?: string
  ci: string
  firstName: string
  lastName: string
  oxygenPercent: number
  fatPercent: number
  sugarPercent: number
}

export interface IClientValidation {
  ci: () => string | null
  firstName: () => string | null
  lastName: () => string | null
  oxygenPercent: () => string | null
  fatPercent: () => string | null
  sugarPercent: () => string | null
}
