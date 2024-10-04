"use client";
import SafeProvider from "@safe-global/safe-apps-react-sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import { SWRConfig, type SWRConfiguration } from "swr";
import { WagmiProvider } from "wagmi";

import { localStorageProvider } from "@/lib/localStorageProvider";
import { wagmiConfig } from "@/wagmi";

export const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 30_000,
  shouldRetryOnError: false,
  keepPreviousData: true,
  provider: localStorageProvider,
};

export function RootLayout({ children }: React.PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SafeProvider loader={<SafeLoader />}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <SWRConfig value={swrConfig}>
            <div className="flex flex-col min-h-screen size-screen justify-between">
              <div className="size-full bg-background">{children}</div>
            </div>
          </SWRConfig>
        </QueryClientProvider>
      </WagmiProvider>
    </SafeProvider>
  );
}

function SafeLoader() {
  return (
    <div className="bg-background size-full flex-col px-12 py-16 md:py-20 flex items-center justify-center">
      <div className="text-center text-3xl">This is a Safe (wallet) App</div>
      <p className="text-xl">
        To access please use this
        <Link
          target="_blank"
          href="https://app.safe.global/share/safe-app"
          className="text-highlight"
        >
          {" "}
          link{" "}
        </Link>
        with your safe account connected
      </p>
    </div>
  );
}
