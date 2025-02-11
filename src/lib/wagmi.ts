'use client';

import { http } from 'wagmi'
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit'

// https://cloud.walletconnect.com/
const projectId = '6e86d5a034f77ada42745397ff811bfe';

// const supportedChains: Chain[] = [mainnet, sepolia, base, optimism]

const monadTestnetCustomChain = {
  id: 1,
  name: 'Monad Testnet',
  iconUrl: '',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet.rpc.monad.xyz'] },
  },
  blockExplorers: {
    default: { name: 'MonadScan', url: 'https://testnet.explorer.monad.xyz' },
  },
} as const satisfies Chain;

const sepoliaConfig = {
  id: 1,
  name: "Sepolia test network",
  iconUrl: "",
  iconBackground: "#fff",
  nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://eth-sepolia.g.alchemy.com/v2/iR14HNK9WIzmVirPdqF9Mj597fZ_3Cma'] },
  },
  blockExplorers: {
    default: { name: 'SepoliaScan', url: 'https://sepolia.etherscan.io' },
  },
}

export const config = getDefaultConfig({
  appName: 'Nad UI',
  projectId: projectId,
  chains: [sepoliaConfig],
  transports: {
    // [monadTestnetCustomChain.id]: http(),
    [sepoliaConfig.id]: http(),
  },
  ssr: true 
})