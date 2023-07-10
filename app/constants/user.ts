import { IUser } from "../interfaces/interfaces"

export const user: IUser = JSON.parse(
  window.localStorage.getItem("user") as string
)
