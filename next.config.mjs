/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    JSON_RPC_NODE_PROVIDER: process.env.JSON_RPC_NODE_PROVIDER,
  },
  async headers() {
    return [
      {
        source: "/manifest.json",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET" },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, content-type, Authorization",
          },
        ],
      },
    ];
  }
};

export default nextConfig;
