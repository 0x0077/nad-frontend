'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  RainbowKitProvider,
  darkTheme,
  AvatarComponent
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@/lib/wagmi';
import { CustomJazzicon } from '@/components/header/Jazzicon';
import { StoreProvider } from "@stores/context";
import { WalletProvider } from "@/components/providers/WalletProvider";
import { ToastProvider } from '@/components/ui/toast';


const queryClient = new QueryClient();

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {ensImage ? (
        <Image
          src={ensImage}
          width={size}
          height={size}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          alt="ENS Avatar"
        />
      ) : (
        <CustomJazzicon
          address={address}
          diameter={size}
          className="flex items-center justify-center"
        />
      )}
    </div>
  );
};

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          modalSize="compact" 
          locale="en" 
          avatar={CustomAvatar}
        >
          <StoreProvider>
            <ToastProvider>
              <WalletProvider>
                {mounted && children}
              </WalletProvider>
            </ToastProvider>
          </StoreProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}