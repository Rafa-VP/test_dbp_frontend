"use client"
import { useForm } from "@mantine/form"
import { useState } from "react"
import { create, update } from "../service/client-service"
import { IClient, IUser } from "@/app/interfaces/interfaces"

interface IValues extends IClient {
  action?: string
  ci: string
  firstName: string
  lastName: string
  oxygenPercent: number
  fatPercent: number
  sugarPercent: number
}

function isNumeric(value: string) {
  return /^-?\d+$/.test(value)
}

export const useClientForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  let user: IUser
  let accessToken: string
  if (typeof window !== "undefined") {
    let userItem = localStorage.getItem("user") || "{}"
    user = JSON.parse(userItem)
    accessToken = user.accessToken
  }
  const form = useForm<IValues>({
    initialValues: {
      action: "",
      ci: "",
      firstName: "",
      lastName: "",
      oxygenPercent: undefined as any,
      fatPercent: undefined as any,
      sugarPercent: undefined as any,
    },
    validate: {
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
    },
  })

  const onSubmit = form.onSubmit(async (values) => {
    switch (values.action) {
      case "CREATE":
        setIsLoading(true)
        delete values["action"]
        create({ client: values, accessToken })
          .then((res) => console.log(res))
          .catch((err) => console.log(err))
          .finally(() => setIsLoading((prev) => !prev))
        break
      case "UPDATE":
        setIsLoading(true)
        delete values["action"]
        update({
          _id: values._id as string,
          client: values,
          accessToken: accessToken,
        })
          .then((res) => console.log(res))
          .catch((err) => console.log(err))
          .finally(() => setIsLoading((prev) => !prev))
        break
      default:
    }
  })

  const ci = { ...form.getInputProps("ci") }
  const firstName = { ...form.getInputProps("firstName") }
  const lastName = { ...form.getInputProps("lastName") }
  const oxygenPercent = {
    ...form.getInputProps("oxygenPercent"),
  }
  const fatPercent = { ...form.getInputProps("fatPercent") }
  const sugarPercent = { ...form.getInputProps("sugarPercent") }

  const props = {
    ci,
    firstName,
    lastName,
    oxygenPercent,
    fatPercent,
    sugarPercent,
    onSubmit,
  }

  const values = form.values
  const setFieldValue = form.setFieldValue
  const reset = form.reset

  return {
    isLoading,
    props,
    onSubmit,
    setFieldValue,
    values,
    reset,
  }
}
