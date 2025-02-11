import { Suspense } from "react";
import { SwapSkeleton } from "./SwapSkeleton";
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import { TokenConfig } from "@/lib/interface";

const SwapPageContent = dynamic(
  () => import('./SwapPageContent').then(mod => ({ default: mod.SwapPageContent })),
  {
    ssr: false,
    loading: () => <SwapSkeleton />
  }
);

export const metadata: Metadata = {
  title: 'Swap | DEX',
  description: 'Swap your tokens instantly with the best rates',
};


const testToken: TokenConfig = {
  tokens: [
    {
      name: "ETH",
      icon: "/eth.png",
      symbol: "ETH",
      contract: "0x0000000000000000000000000000000000000000",
      decimals: 18,
      popular: "true"
    },
    {
      name: "USDC",
      icon: "/usdc.png",
      symbol: "USDC",
      contract: "0xD47971C7F5B1067d25cd45d30b2c9eb60de96443",
      decimals: 6,
      popular: "true"
    },
    {
      name: "USDT",
      icon: "/usdt.png",
      symbol: "USDT",
      contract: "0x3Adf21A6cbc9ce6D5a3ea401E7Bae9499d391298",
      decimals: 6,
      popular: "true"
    },
    {
      name: "Wrapped ETH",
      icon: "/eth.png",
      symbol: "WETH",
      contract: "0x0C8aFD1b58aa2A5bAd2414B861D8A7fF898eDC3A",
      decimals: 18,
      popular: "true"
    },

  ],
  popularTokens: ["USDC", "USDT", "WETH", "ETH"]
}


export default function SwapPage() {
  return (
    <Suspense fallback={<SwapSkeleton />}>
      <SwapPageContent initialTokenConfig={testToken} />
    </Suspense>
  );
}