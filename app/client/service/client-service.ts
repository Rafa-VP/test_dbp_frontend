import { ClientAPI } from "@/app/instances/axios-instance"
import { IClient } from "@/app/interfaces/interfaces"
import { AxiosError } from "axios"

export const create = async ({
  client,
  accessToken,
}: {
  client: IClient
  accessToken: string
}): Promise<any> => {
  try {
    const response = await ClientAPI.post("/", client, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (err: any) {
    throw new AxiosError(err)
  }
}

export const findAll = async (
  accessToken: string
): Promise<IClient[]> => {
  try {
    const response = await ClientAPI.get("/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (err: any) {
    throw new AxiosError(err)
  }
}

export const deleteOne = async ({
  _id,
  accessToken,
}: {
  _id: string
  accessToken: string
}): Promise<any> => {
  try {
    const response = await ClientAPI.delete(`/${_id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (err: any) {
    throw new AxiosError(err)
  }
}

export const update = async ({
  _id,
  accessToken,
  client,
}: {
  _id: string
  accessToken: string
  client: IClient
}): Promise<any> => {
  try {
    const response = await ClientAPI.put(`/${_id}`, client, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (err: any) {
    throw new AxiosError(err)
  }
}
