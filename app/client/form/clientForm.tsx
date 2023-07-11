import {
  ActionIcon,
  Button,
  Grid,
  Loader,
  NumberInput,
  TextInput,
  Title,
} from "@mantine/core"
import { IconX } from "@tabler/icons-react"

export default function ClientForm({
  props,
  onSubmit,
  setFieldValue,
  values,
  reset,
  isLoadingMutation,
}: {
  props: any
  onSubmit: any
  setFieldValue: any
  values: any
  isLoadingMutation: boolean
  reset: any
}) {
  return (
    <Grid
      mt={20}
      mb={20}
      pb={14}
      px={0}
      mx={0}
      pt={6}
      align="center"
      justify="center"
      sx={{
        backgroundColor: "#fff",
        borderRadius: "4px",
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
      }}
    >
      <Grid.Col xs={11} md={11} lg={11} span={10}>
        <Title ml={16} align="start" color="indigo" order={4}>
          Client Form
        </Title>
      </Grid.Col>
      <Grid.Col xs={1} md={1} lg={1} span={2}>
        {values._id && (
          <ActionIcon
            color="indigo"
            variant="light"
            onClick={() => {
              reset()
            }}
          >
            <IconX size={20} />
          </ActionIcon>
        )}
      </Grid.Col>
      <Grid.Col span={11}>
        <form autoComplete="off" onSubmit={onSubmit}>
          <Grid justify="center" align="center" p={0}>
            <Grid.Col xs={6} md={4} lg={2}>
              <TextInput
                disabled={values._id !== undefined}
                placeholder="CI"
                type="text"
                size="sm"
                autoComplete="new-id"
                {...props.ci}
              />
            </Grid.Col>
            <Grid.Col xs={6} md={4} lg={2}>
              <TextInput
                placeholder="First Name"
                type="text"
                size="sm"
                autoComplete="new-fn"
                {...props.firstName}
              />
            </Grid.Col>
            <Grid.Col xs={6} md={4} lg={2}>
              <TextInput
                placeholder="Last Name"
                type="text"
                size="sm"
                autoComplete="new-ln"
                {...props.lastName}
              />
            </Grid.Col>
            <Grid.Col xs={6} md={4} lg={2}>
              <NumberInput
                minLength={1}
                max={100}
                min={0}
                maxLength={3}
                placeholder="Oxygen Percent"
                size="sm"
                autoComplete="new-op"
                {...props.oxygenPercent}
              />
            </Grid.Col>
            <Grid.Col xs={6} md={4} lg={2}>
              <NumberInput
                minLength={1}
                max={100}
                min={0}
                maxLength={3}
                placeholder="Fat Percent"
                size="sm"
                autoComplete="new-fp"
                {...props.fatPercent}
              />
            </Grid.Col>
            <Grid.Col xs={6} md={4} lg={2}>
              <NumberInput
                minLength={1}
                min={0}
                max={100}
                maxLength={3}
                placeholder="Sugar Percent"
                size="sm"
                autoComplete="new-sp"
                {...props.sugarPercent}
              />
            </Grid.Col>

            <Grid.Col xs={6} md={4} lg={2}>
              <Button
                disabled={
                  values._id !== undefined || isLoadingMutation
                }
                fullWidth
                color="green"
                type="submit"
                size="sm"
                onClick={() => setFieldValue("action", "CREATE")}
                leftIcon={
                  isLoadingMutation &&
                  values._id === undefined && <Loader size={20} />
                }
              >
                Create
              </Button>
            </Grid.Col>
            <Grid.Col xs={6} md={4} lg={2}>
              <Button
                disabled={
                  values._id === undefined || isLoadingMutation
                }
                fullWidth
                color="indigo"
                type="submit"
                size="sm"
                onClick={() => setFieldValue("action", "UPDATE")}
                leftIcon={
                  isLoadingMutation &&
                  values._id !== undefined && <Loader size={20} />
                }
              >
                Update
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Grid.Col>
    </Grid>
  )
}
