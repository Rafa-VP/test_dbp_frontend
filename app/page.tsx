"use client"
import { Box, Title } from "@mantine/core"
import useUser from "./login/hooks/useUser"
import { useEffect } from "react"
import { findAll } from "./services/client/client-service"

const ths = (
  <tr>
    <th>Element position</th>
    <th>Element name</th>
    <th>Symbol</th>
    <th>Atomic mass</th>
  </tr>
)

export default function Home() {
  const { accessToken, username } = useUser()

  useEffect(() => {
    if (accessToken) {
      findAll(accessToken)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }
  }, [accessToken])

  if (!accessToken || !username) return <main>Loading...</main>
  return (
    <Box maw={396} mx="auto" my="4rem">
      <Title align="center" color="indigo" order={1}>
        Laboratorio
      </Title>
    </Box>
  )
}
