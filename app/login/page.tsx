"use client"
import {
  Box,
  TextInput,
  Button,
  Title,
  Grid,
  PasswordInput,
} from "@mantine/core"
import { useLoginForm } from "./hooks/useLoginForm"
import "./login.css"
import {
  IconEyeCheck,
  IconEyeOff,
  IconLock,
  IconUser,
} from "@tabler/icons-react"
import { Loader } from "@mantine/core"

export default function Login() {
  const { isLoading, passwordProps, usernameProps, onSubmit } =
    useLoginForm()

  return (
    <Box maw={396} mx="auto" my="4rem">
      <Title align="center" color="indigo" order={1}>
        Laboratorio
      </Title>
      <form autoComplete="off" onSubmit={onSubmit}>
        <Grid
          grow
          className="MainGrid"
          justify="center"
          align="center"
          p={6}
        >
          <Grid.Col span={12}>
            <TextInput
              icon={<IconUser size={20} />}
              px={2}
              placeholder="Username"
              type="text"
              size="lg"
              autoComplete="new-username"
              {...usernameProps}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <PasswordInput
              px={2}
              autoComplete="new-password"
              placeholder="Password"
              size="lg"
              icon={<IconLock size={20} />}
              visibilityToggleIcon={({ reveal }) =>
                reveal ? <IconEyeOff /> : <IconEyeCheck />
              }
              {...passwordProps}
            />
          </Grid.Col>

          <Grid.Col span={12} mt={2}>
            <Button
              disabled={isLoading}
              fullWidth
              color="indigo"
              type="submit"
              size="lg"
            >
              {!isLoading ? "Log In" : <Loader color="indigo" />}
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Box>
  )
}
