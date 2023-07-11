"use client"
import "./globals.css"
import { Inter } from "next/font/google"
import { QueryClientProvider, QueryClient } from "react-query"

const inter = Inter({ subsets: ["latin"] })

export const queryClient = new QueryClient()
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="es">
        <head>
          <title>RVP Lab</title>
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </QueryClientProvider>
  )
}
