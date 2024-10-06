"use client";
import { wagmiConfig } from "@/wagmi";
import SafeProvider from "@safe-global/safe-apps-react-sdk";
import Link from "next/link";
import type React from "react";
import { WagmiProvider } from "wagmi";

export function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <SafeProvider loader={<SafeLoader />}>
      <WagmiProvider config={wagmiConfig}>
        <div className="flex flex-col min-h-screen size-screen justify-between">
          <div className="size-full bg-background">{children}</div>
        </div>
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
