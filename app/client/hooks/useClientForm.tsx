"use client"
import { useForm } from "@mantine/form"
import { create, update } from "../service/client-service"
import { IUser } from "@/app/interfaces/interfaces"
import { IValues } from "../interfaces/client-interfaces"
import { clientValidation } from "../validations/client-validation"
import { useMutation } from "react-query"
import { queryClient } from "@/app/layout"
import { Dispatch, SetStateAction } from "react"

export const useClientForm = (
  setMutationsInCache: Dispatch<SetStateAction<number>>
) => {
  /* ||=========== GETTING USER INFORMATION FROM LOCAL STORAGE ========|| */
  let user: IUser
  let accessToken: string = ""
  if (typeof window !== "undefined") {
    let userItem = localStorage.getItem("user") || "{}"
    user = JSON.parse(userItem)
    accessToken = user.accessToken
  }
  /* ||=============== FORM HOOK ===================|| */
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
    validate: clientValidation,
  })

  /* ||================= REACT QUERY MUTATIONS ===================|| */
  const createMutation = useMutation({
    mutationKey: "create-mutation",
    mutationFn: async () =>
      await create({ client: form.values, accessToken }),
    onSuccess: () => {
      queryClient.invalidateQueries("clients-data")
      setMutationsInCache((prev) => prev + 1)
    },
    onError: () => setMutationsInCache((prev) => prev + 1),
  })
  const updateMutation = useMutation({
    mutationKey: "update-mutation",
    mutationFn: async () =>
      await update({
        _id: form.values._id as string,
        client: form.values,
        accessToken: accessToken,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("clients-data")
      setMutationsInCache((prev) => prev + 1)
    },
    onError: (err: any) => console.log(err.response.data),
  })

  /* ||============== FORM PROPS =============|| */
  const onSubmit = form.onSubmit(async (values) => {
    switch (values.action) {
      case "CREATE":
        try {
          await createMutation.mutateAsync()
        } catch (err) {}

        break
      case "UPDATE":
        try {
          await updateMutation.mutateAsync()
        } catch (err) {}
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
    isLoadingMutation: [createMutation, updateMutation].some(
      (q) => q.isLoading
    ),
    props,
    onSubmit,
    setFieldValue,
    values,
    reset,
  }
}
