/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: () => {
    return [
      {
        source: "/client",
        destination: "https://test-dbp-backend.vercel.app/client",
      },
      {
        source: "/client/:_id",
        destination:
          "https://test-dbp-backend.vercel.app/client/:_id",
      },
      {
        source: "/auth/:last",
        destination: "https://test-dbp-backend.vercel.app/auth/:last",
      },
    ]
  },
}

module.exports = nextConfig
