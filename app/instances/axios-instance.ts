import axios from "axios"

export const AuthAPI = axios.create({
  baseURL: "https://test-dbp-backend.vercel.app/auth",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
})

export const ClientAPI = axios.create({
  baseURL: "https://test-dbp-backend.vercel.app/client",
  /* headers: {
    Authorization: `Bearer ${user?.accessToken}`,
  }, */
})
