"use client"
import { useForm } from "@mantine/form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signIn } from "../service/auth-service"

export const useAuthForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const form = useForm({
    initialValues: { username: "", password: "" },
    validate: {
      username: (value) =>
        value.length < 1
          ? "Username must have at least 1 letter"
          : null,
      password: (value) =>
        value.length < 1
          ? "Username must have at least 1 letter"
          : null,
    },
  })

  const onSubmit = form.onSubmit(async (values: any) => {
    setIsLoading(true)
    await signIn({
      username: values.username,
      password: values.password,
    })
      .then((res) => {
        window.localStorage.setItem("user", JSON.stringify(res))
        router.push("/")
      })
      .catch((err) => {
        if (err.message.response.status === 401) {
          form.setFieldError(
            "password",
            err.message.response.data.message
          )
        }
        if (err.message.response.status === 404) {
          form.setFieldError(
            "username",
            err.message.response.data.message
          )
        }
      })
      .finally(() => setIsLoading((prev) => !prev))
  })

  const usernameProps = { ...form.getInputProps("username") }
  const passwordProps = { ...form.getInputProps("password") }

  return { isLoading, usernameProps, passwordProps, onSubmit }
}
