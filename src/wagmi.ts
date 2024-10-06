import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { safe } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  connectors: [safe()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
