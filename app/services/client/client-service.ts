import { ClientAPI } from "@/app/instances/axios-instance"
import { AxiosError } from "axios"

interface IClient {
  _id: string
  ci: string
  firstName: string
  lastName: string
  sugarPercent: number
  fatPercent: number
  oxygenPercent: number
  createAt: string
  updateAt: string
}

export const create = () => {}

export const findAll = async (): Promise<IClient[]> => {
  try {
    const response = await ClientAPI.get("/")
    return response.data
  } catch (err: any) {
    throw new AxiosError(err)
  }
}
