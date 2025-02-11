'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@stores/context';
import { SwapCardProps, defaultETH, nullToken } from '@/lib/interface';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SwapHeader } from "@/components/dex/swap/SwapHeader";
import { FromTokenInput } from "@/components/dex/swap/FromTokenInput";
import { ToTokenInput } from "@/components/dex/swap/ToTokenInput";
import { SwapSeparator } from "@/components/dex/swap/SwapSeparator";
import { SwapDetail } from "@/components/dex/swap/SwapDetail";
import { SwapButton } from "@/components/dex/swap/SwapButton";
import { useSwitchChain, useAccount } from 'wagmi';
import { useTokenBalance } from '@/hooks/useTokenBalance';

const SwapCard: React.FC<Pick<SwapCardProps, 
  'onTokenCardOpen' | 
  'onSwapClose' | 
  'onSetClose' | 
  'onConnectOpen'
>> = observer(({ 
  onTokenCardOpen, 
  onSwapClose, 
  onSetClose, 
  onConnectOpen 
}) => {
  const { chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const { buttonStore, swapStore, walletStore, notificationStore } = useStores();
  const isConnected = walletStore.isConnected;
  const [isExpanded, setIsExpanded] = useState(false);
  const [fromToken, setFromToken] = useState(defaultETH);
  const [toToken, setToToken] = useState(nullToken);
  
  const { balance: fromBalance, refreshBalance: fromRefreshBalance } = useTokenBalance(fromToken.contract, true);
  const { balance: toBalance, refreshBalance: toRefreshBalance } = useTokenBalance(toToken.contract, false);

  const refreshBalances = () => {
    fromRefreshBalance();
    toRefreshBalance();
  };

  useEffect(() => {
    refreshBalances();
  }, [walletStore.address]);

  useEffect(() => {
    setFromToken(swapStore.fromToken);
    setToToken(swapStore.toToken);
  }, [swapStore.fromToken, swapStore.toToken]);
  
  const handleSeparatorClick = () => {
    swapStore.setInitalize();
    const fromToken = swapStore.fromToken;
    const toToken = swapStore.toToken;
    swapStore.fromToken = toToken;
    swapStore.toToken = fromToken;
  };

  const handleButtonAction = async () => {
    if (!isConnected) {
      onConnectOpen();
      return;
    }

    if (chainId !== 1) {
      try {
        await switchChain({ chainId: 1 });
      } catch (error) {
        console.error('Failed to switch chain', error);
      }
      return;
    }

    onSwapClose();
  }
  
  return (
    <Suspense fallback={<SwapSkeleton />}>
      <div className="flex w-full justify-center">
        <Card className="w-full mt-4 mb-8 md:w-[480px] rounded-3xl">
          <CardContent className="flex flex-col space-y-1 py-4 px-2">
            <SwapHeader onAction={onSetClose} />
            
            <div className="flex flex-col relative">
              <FromTokenInput onTokenCardOpen={() => onTokenCardOpen(true)} fromToken={fromToken} />
              <SwapSeparator onClick={handleSeparatorClick} />
              <ToTokenInput onTokenCardOpen={() => onTokenCardOpen(false)} toToken={toToken}  />
            </div>

            <SwapDetail isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
            <SwapButton onAction={handleButtonAction} />
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
});

const SwapSkeleton = () => {
  return (
    <Card className="w-full mx-4 my-8 md:w-[480px]">
      <CardContent className="flex flex-col space-y-4 p-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-12 w-full" />
      </CardContent>
    </Card>
  );
};

export default SwapCard;