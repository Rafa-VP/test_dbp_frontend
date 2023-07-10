"use client"
import { IUser } from "@/app/interfaces/interfaces"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]))
  } catch (err) {
    return null
  }
}

const setIntervalInmmediately = (
  func: () => void,
  interval: number
) => {
  func()
  return setInterval(func, interval)
}

export default function useUser() {
  const [username, setUsername] = useState<string>()
  const [accessToken, setAcessToken] = useState<string>()
  const router = useRouter()

  useEffect(() => {
    const intervalUser = setIntervalInmmediately(() => {
      const user: IUser = JSON.parse(
        localStorage.getItem("user") as string
      )
      if (user) {
        setUsername(user.username)
        setAcessToken(user.accessToken)
        const decodedJwt = parseJwt(user.accessToken)
        console.log(
          `User authenticated until ${new Date(
            decodedJwt.exp * 1000
          )}`
        )
        if (decodedJwt.exp * 1000 < Date.now()) {
          window.localStorage.removeItem("user")
          router.push("/auth")
        }
      } else {
        router.push("/auth")
      }
    }, 60 * 1000)

    return () => clearInterval(intervalUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { username, accessToken }
}
