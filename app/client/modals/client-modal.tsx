/* eslint-disable no-unused-vars */
import {
  Badge,
  Grid,
  Modal,
  Paper,
  Slider,
  Text,
  Title,
  rem,
} from "@mantine/core"
import { IconCandy, IconLungs, IconPizza } from "@tabler/icons-react"
import { numberInRange } from "../functions/client-functions"

const marks = [
  { value: 0, label: "0%" },
  { value: 25, label: "25%" },
  { value: 50, label: "50%" },
  { value: 75, label: "75%" },
  { value: 100, label: "100%" },
]
// eslint-disable-entire-file no-unused-vars
enum Risk {
  HIGH = "HIGH",
  MID = "MID",
  LOW = "LOW",
  NONE = "NONE",
}
export const ClientModal = ({
  opened,
  close,
  firstName,
  lastName,
  oxygenPercent,
  fatPercent,
  sugarPercent,
}: {
  opened: boolean
  close: () => void
  firstName: string
  lastName: string
  oxygenPercent: number
  fatPercent: number
  sugarPercent: number
}) => {
  // ||============ CALCULATING RIKS LEVEL ==============||
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

  return (
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
          {firstName} {lastName} - Blood Test
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
  )
}
