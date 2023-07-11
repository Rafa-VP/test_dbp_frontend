"use client"
import { Grid, Loader, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { IClient } from "./interfaces/interfaces"
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables"
import useUser from "./auth/hooks/useUser"
import ClientForm from "./client/form/clientForm"
import { useClientForm } from "./client/hooks/useClientForm"
import { useDisclosure } from "@mantine/hooks"
import { useClientDataTable } from "./client/hooks/useClientDataTable"
import { useColumns } from "./client/hooks/useColumns"
import { ClientModal } from "./client/modals/client-modal"
import { queryClient } from "./layout"
import { Notifications } from "@mantine/notifications"
import { notifications } from "@mantine/notifications"
import { IconCheck, IconX } from "@tabler/icons-react"
import { AxiosError } from "axios"

const options: MUIDataTableOptions = {
  selectableRows: "none",
  print: "false",
  viewColumns: "false",
  filter: "false",
  download: "false",
  responsive: "simple",
  sort: false,
}

interface IOkResponse {
  message: string
  client: IClient
}
interface IErrorResponse {
  message?: string
  error: string
  statusCode: number
}

export default function Home() {
  // ||=============== STATES ================||
  const [firstName, setFirstName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [oxygenPercent, setOxygenPercent] = useState<number>(0)
  const [fatPercent, setFatPercent] = useState<number>(0)
  const [sugarPercent, setSugarPercent] = useState<number>(0)
  const [mutationsInCache, setMutationsInCache] = useState<number>(0)

  // ||================= USE EFFECT FOR NOTIFICACTIONS ===============||
  useEffect(() => {
    if (queryClient.getMutationCache().getAll().length > 0) {
      const cacheArray = queryClient.getMutationCache().getAll()
      const lastCached = cacheArray[cacheArray.length - 1]
      /*  const key = lastCached.options.mutationKey as string */
      const state = lastCached.state
      const status = state.status
      if (status === "error") {
        const axiosError: AxiosError = lastCached.state.error as any
        const errorResponse: IErrorResponse = (
          axiosError.message as any
        ).response?.data as any
        notifications.show({
          title: errorResponse.error,
          message: errorResponse.message,
          autoClose: 10000,
          withCloseButton: true,
          withBorder: true,
          color: "red",
          icon: <IconX size={20} />,
        })
      }
      if (status === "success") {
        const data: IOkResponse = state.data as any
        const message = `Action on client with CI -> ${data.client.ci}`
        notifications.show({
          title: data.message,
          message: message,
          autoClose: 10000,
          withCloseButton: true,
          withBorder: true,
          color: "green",
          icon: <IconCheck size={20} />,
        })
      }
    }
  }, [mutationsInCache])

  // ||==================== USER HOOK =================||
  const { accessToken, username } = useUser()

  // ||==================== CLIENT FORM HOOK ==============||
  const {
    props,
    onSubmit,
    setFieldValue,
    values,
    isLoadingMutation,
    reset,
  } = useClientForm(setMutationsInCache)
  const [opened, { open, close }] = useDisclosure(false)

  // ||=============== COLUMNS HOOK ===============||
  const { columns } = useColumns({
    open,
    setFatPercent,
    setFieldValue,
    setFirstName,
    setLastName,
    setOxygenPercent,
    setSugarPercent,
    setMutationsInCache,
  })

  /* ||============== DATATABLE HOOK =============|| */
  const { data, isLoadingQuery } = useClientDataTable()

  // ||=============== LOADING QUERY STATE =============||
  if (!accessToken || !username || isLoadingQuery)
    return (
      <Grid justify="center" align="center" mt={30} mb={20}>
        <Loader color="indigo" />
      </Grid>
    )
  return (
    <>
      <Notifications position="top-right" limit={10} />
      {/* ||============== CLIENT MODAL ==========|| */}
      <ClientModal
        fatPercent={fatPercent}
        firstName={firstName as string}
        lastName={lastName as string}
        opened={opened}
        close={close}
        oxygenPercent={oxygenPercent}
        sugarPercent={sugarPercent}
      />
      {/* ||================= MAIN PAGE ===============|| */}
      <Grid justify="center" align="center" mt={30} mb={20}>
        <Grid.Col span={12}>
          <Title align="center" color="indigo" order={1}>
            RVP Laboratory
          </Title>
        </Grid.Col>
        <Grid.Col span={10}>
          <ClientForm
            isLoadingMutation={isLoadingMutation}
            onSubmit={onSubmit}
            props={props}
            setFieldValue={setFieldValue}
            values={values}
            reset={reset}
          />
        </Grid.Col>
        {!isLoadingQuery && (
          <Grid.Col span={10}>
            <MUIDataTable
              title={
                <Title align="start" color="indigo" order={4}>
                  Clients DataTable
                </Title>
              }
              data={data as IClient[]}
              columns={columns}
              options={options}
            />
          </Grid.Col>
        )}
      </Grid>
    </>
  )
}
