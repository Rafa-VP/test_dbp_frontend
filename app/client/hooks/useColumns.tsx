import { ActionIcon, Flex } from "@mantine/core"
import { deleteOne } from "../service/client-service"
import {
  IconEdit,
  IconReportMedical,
  IconTrash,
} from "@tabler/icons-react"
import { MUIDataTableColumnDef } from "mui-datatables"
import { IUser } from "@/app/interfaces/interfaces"
import { useMutation } from "react-query"
import { Dispatch, SetStateAction } from "react"
import { queryClient } from "@/app/layout"

export const useColumns = ({
  setFieldValue,
  setFirstName,
  setLastName,
  setOxygenPercent,
  setFatPercent,
  setSugarPercent,
  open,
  setMutationsInCache,
}: {
  setFieldValue: Function
  setFirstName: Function
  setLastName: Function
  setOxygenPercent: Function
  setFatPercent: Function
  setSugarPercent: Function
  open: Function
  setMutationsInCache: Dispatch<SetStateAction<number>>
}) => {
  /* ||=========== GETTING USER INFORMATION FROM LOCAL STORAGE ========|| */
  let user: IUser
  let accessToken: string = ""
  if (typeof window !== "undefined") {
    let userItem = localStorage.getItem("user") || "{}"
    user = JSON.parse(userItem)
    accessToken = user.accessToken
  }

  // ||============== DELETE MUTATE ==============||
  const deleteMutation = useMutation({
    mutationKey: "delete-mutation",
    mutationFn: async (_id: string) =>
      await deleteOne({
        _id,
        accessToken: accessToken,
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries("clients-data")
      queryClient
        .getMutationCache()
        .findAll({ mutationKey: "delete-mutation" })
        .at(-1)
        // @ts-ignore
        ?.setState((prev) => ({ ...prev, data: { ...res } }))
      setMutationsInCache((prev) => prev + 1)
    },
    onError: () => setMutationsInCache((prev) => prev + 1),
  })

  // ||=============== DELETE FUNCTION ================||
  const callDelete = async (_id: string) => {
    try {
      await deleteMutation.mutateAsync(_id)
    } catch (err) {}
  }

  const columns: (MUIDataTableColumnDef | undefined)[] = [
    {
      name: "",
      label: "ACTIONS",
      options: {
        customBodyRender: (_value, tableMeta) => (
          <Flex
            justify="center"
            align="center"
            gap="xs"
            direction="row"
          >
            <ActionIcon
              color="red"
              variant="filled"
              onClick={async () => {
                await callDelete(tableMeta.rowData[1])
              }}
            >
              <IconTrash size={20} />
            </ActionIcon>

            <ActionIcon
              color="indigo"
              variant="filled"
              onClick={() => {
                setFieldValue("_id", tableMeta.rowData[1])
                setFieldValue("ci", tableMeta.rowData[2])
                setFieldValue("firstName", tableMeta.rowData[3])
                setFieldValue("lastName", tableMeta.rowData[4])
                setFieldValue("oxygenPercent", tableMeta.rowData[5])
                setFieldValue("fatPercent", tableMeta.rowData[6])
                setFieldValue("sugarPercent", tableMeta.rowData[7])
              }}
            >
              <IconEdit size={20} />
            </ActionIcon>

            <ActionIcon
              color="green"
              variant="filled"
              onClick={() => {
                setFirstName(tableMeta.rowData[3])
                setLastName(tableMeta.rowData[4])
                setOxygenPercent(tableMeta.rowData[5])
                setFatPercent(tableMeta.rowData[6])
                setSugarPercent(tableMeta.rowData[7])
                open()
              }}
            >
              <IconReportMedical size={20} />
            </ActionIcon>
          </Flex>
        ),
        sort: false,
      },
    },
    {
      name: "_id",
      label: "_id",
      options: { searchable: true, display: "false" },
    },
    {
      name: "ci",
      label: "CI",
      options: { searchable: true },
    },
    {
      name: "firstName",
      label: "First Name",
      options: { searchable: true },
    },
    {
      name: "lastName",
      label: "Last Name",
      options: { searchable: true },
    },
    {
      name: "oxygenPercent",
      label: "Oxygen Percent",
      options: { searchable: false },
    },
    {
      name: "fatPercent",
      label: "Fat Percent",
      options: { searchable: false },
    },
    {
      name: "sugarPercent",
      label: "Sugar Percent",
      options: { searchable: false },
    },
    ,
  ]

  const newColumns = columns.map((value: any) => ({
    ...(value as any),
    options: {
      ...(value?.options as any),
      setCellProps: () => ({ align: "center" }),
      setCellHeaderProps: () => ({ align: "center" }),
    },
  }))
  return { columns: newColumns }
}
