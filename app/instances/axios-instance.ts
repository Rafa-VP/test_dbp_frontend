import axios from "axios"

export const AuthAPI = axios.create({
  baseURL: "/auth",
  /*  headers: { "Content-Type": "application/x-www-form-urlencoded" }, */
})

export const ClientAPI = axios.create({
  baseURL: "/client",
})
