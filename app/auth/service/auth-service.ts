import { AuthAPI } from "@/app/instances/axios-instance"
import { AxiosError } from "axios"

export const signIn = async ({
  username,
  password,
}: {
  username: string
  password: string
}) => {
  try {
    const response = await AuthAPI.post("/login", {
      username,
      password,
    })
    return response.data
  } catch (err: any) {
    throw new AxiosError(err)
  }
}
