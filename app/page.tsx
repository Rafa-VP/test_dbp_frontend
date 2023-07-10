"use client"
import {
  ActionIcon,
  Badge,
  Box,
  Flex,
  Grid,
  Loader,
  Modal,
  Paper,
  Slider,
  Text,
  Title,
  rem,
} from "@mantine/core"
import { useEffect, useState } from "react"
import { deleteOne, findAll } from "./client/service/client-service"
import { IClient } from "./interfaces/interfaces"
import MUIDataTable, { MUIDataTableColumnDef } from "mui-datatables"
import {
  IconCandy,
  IconEdit,
  IconLungs,
  IconPizza,
  IconReportMedical,
  IconTrash,
} from "@tabler/icons-react"
import useUser from "./auth/hooks/useUser"
import ClientForm from "./client/form/clientForm"
import { useClientForm } from "./client/hooks/useClientForm"
import { useDisclosure } from "@mantine/hooks"

function numberInRange(
  num: number,
  low: number,
  high: number
): boolean {
  return num >= low && num <= high
}

export default function Home() {
  const [clients, setClients] = useState<IClient[]>()
  const [firstName, setFirstName] = useState<string>()
  const [lastName, setLastName] = useState<string>()
  const [oxygenPercent, setOxygenPercent] = useState<number>(0)
  const [fatPercent, setFatPercent] = useState<number>(0)
  const [sugarPercent, setSugarPercent] = useState<number>(0)
  enum Risk {
    HIGH = "HIGH",
    MID = "MID",
    LOW = "LOW",
    NONE = "NONE",
  }
  const riskLevel: Risk =
    sugarPercent > 70 && fatPercent > 88.5 && oxygenPercent < 60
      ? Risk.HIGH
      : numberInRange(sugarPercent, 50, 70) &&
        numberInRange(fatPercent, 62.2, 88.5) &&
        numberInRange(oxygenPercent, 60, 70)
      ? Risk.MID
      : sugarPercent < 50 && fatPercent < 62.2 && oxygenPercent > 70
      ? Risk.LOW
      : Risk.NONE

  const marks = [
    { value: 0, label: "0%" },
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
  ]
  const { accessToken, username } = useUser()
  const { props, onSubmit, setFieldValue, values, isLoading, reset } =
    useClientForm()
  const [opened, { open, close }] = useDisclosure(false)

  const columns: (MUIDataTableColumnDef | undefined)[] = [
    {
      name: "",
      label: "ACTIONS",
      options: {
        customBodyRender: (value, tableMeta) => (
          <Flex
            justify="center"
            align="center"
            gap="xs"
            direction="row"
          >
            <ActionIcon
              color="red"
              variant="filled"
              onClick={async () =>
                deleteOne({
                  _id: tableMeta.rowData[1],
                  accessToken: accessToken as string,
                })
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err))
              }
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

  useEffect(() => {
    if (accessToken) {
      findAll(accessToken)
        .then((res) => setClients(res))
        .catch((err) => console.log(err))
    }
  }, [accessToken])

  if (!accessToken || !username)
    return (
      <Grid justify="center" align="center" mt={30} mb={20}>
        <Loader color="indigo" />
      </Grid>
    )
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Text
            c="indigo"
            fz={20}
            fw={700}
            align="start"
            color="indigo"
          >
            {firstName} {lastName} - Blood Test{" "}
          </Text>
        }
        size={"xl"}
        centered
      >
        <Paper px={30} pt={20} pb={40}>
          <Grid grow gutter={50} justify="center" align="center">
            <Grid.Col span={10}>
              <Title
                align="start"
                color={
                  riskLevel === "HIGH"
                    ? "red"
                    : riskLevel === "MID"
                    ? "orange"
                    : riskLevel === "LOW"
                    ? "blue"
                    : "gray"
                }
                order={4}
              >
                Risk Level:
                <Badge
                  size="lg"
                  ml={20}
                  color={
                    riskLevel === "HIGH"
                      ? "red"
                      : riskLevel === "MID"
                      ? "orange"
                      : riskLevel === "LOW"
                      ? "blue"
                      : "gray"
                  }
                >
                  {riskLevel}
                </Badge>
              </Title>
            </Grid.Col>
            <Grid.Col span={10}>
              <Title align="start" color="lime" order={4} mb={8}>
                Oxygen Percent
              </Title>
              <Slider
                color="lime"
                showLabelOnHover={false}
                value={oxygenPercent}
                thumbChildren={<IconLungs size={20} />}
                thumbSize={26}
                styles={{
                  thumb: { borderWidth: rem(2), padding: rem(2) },
                }}
                marks={marks}
              />
            </Grid.Col>
            <Grid.Col span={10}>
              <Title color="orange" align="start" order={4} mb={8}>
                Fat Percent
              </Title>
              <Slider
                color="orange"
                showLabelOnHover={false}
                value={fatPercent}
                thumbChildren={<IconPizza size={20} />}
                thumbSize={26}
                styles={{
                  thumb: { borderWidth: rem(2), padding: rem(2) },
                }}
                marks={marks}
              />
            </Grid.Col>
            <Grid.Col span={10}>
              <Title align="start" color="pink" order={4} mb={8}>
                Sugar Percent
              </Title>
              <Slider
                color="pink"
                showLabelOnHover={false}
                value={sugarPercent}
                thumbChildren={<IconCandy size={20} />}
                thumbSize={26}
                styles={{
                  thumb: { borderWidth: rem(2), padding: rem(2) },
                }}
                marks={marks}
              />
            </Grid.Col>
          </Grid>
        </Paper>
      </Modal>
      <Grid justify="center" align="center" mt={30} mb={20}>
        <Grid.Col span={12}>
          <Title align="center" color="indigo" order={1}>
            Laboratorio RVP
          </Title>
        </Grid.Col>
        <Grid.Col span={10}>
          <ClientForm
            isLoading={isLoading}
            onSubmit={onSubmit}
            props={props}
            setFieldValue={setFieldValue}
            values={values}
            reset={reset}
          />
        </Grid.Col>
        <Grid.Col span={10}>
          <MUIDataTable
            title={
              <Title align="start" color="indigo" order={4}>
                Clients DataTable
              </Title>
            }
            data={clients as IClient[]}
            columns={newColumns as MUIDataTableColumnDef[]}
            options={{
              selectableRows: "none",
              print: "false",
              viewColumns: "false",
              filter: "false",
              download: "false",
              responsive: "simple",
              textLabels: {},
              sort: false,
            }}
          />
        </Grid.Col>
      </Grid>
    </>
  )
}
