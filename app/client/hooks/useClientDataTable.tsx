import { useQuery } from "react-query"
import { findAll } from "../service/client-service"
import { IUser } from "@/app/interfaces/interfaces"

export const useClientDataTable = () => {
  /* ||=========== GETTING USER INFORMATION FROM LOCAL STORAGE ========|| */
  let user: IUser
  let accessToken: string = ""
  if (typeof window !== "undefined") {
    let userItem = localStorage.getItem("user") || "{}"
    user = JSON.parse(userItem)
    accessToken = user.accessToken
  }

  /* ||============== REACT QUERY ===============|| */
  const { data, isLoading, isError, error } = useQuery({
    queryKey: "clients-data",
    queryFn: async () => await findAll(accessToken),
    enabled: accessToken !== "",
  })

  return { isLoadingQuery: isLoading, data, isError, error }
}
