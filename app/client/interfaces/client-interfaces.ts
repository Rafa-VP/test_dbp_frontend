/* eslint-disable no-unused-vars */
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
  ci: (value: string) => string | null
  firstName: (value: string) => string | null
  lastName: (value: string) => string | null
  oxygenPercent: (value: number) => string | null
  fatPercent: (value: number) => string | null
  sugarPercent: (value: number) => string | null
}
