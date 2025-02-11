'use client';

import { useWalletStore } from "@/hooks/useWalletStore";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { ETH_SEPOLIA_PROVIDER_URL, ZERO_ADDRESS } from "@/lib/interface";
import { ethers } from "ethers";
import { useStores } from "@stores/context";
import { observer } from "mobx-react-lite";

export const WalletProvider = observer(({ children }: { children: React.ReactNode }) => {
  const { isConnected, walletStore, buttonStore } = useWalletStore();
  const { swapStore } = useStores();
  const { chainId } = useAccount();

  useEffect(() => {
    const handleError = () => {
      if (!isConnected) {
        walletStore.reset();
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [isConnected, walletStore]);


  useEffect(() => {
    const updateButtonState = async () => {
      if (!walletStore.isConnected) {
        buttonStore.setSwapButton();
        return;
      }
      console.log(chainId);

      if (chainId !== 1) {
        buttonStore.setSwapButton(
          "Switch to Monad Testnet", 
          false, 
          'bg-red-600 hover:bg-red-700 text-white'
        );
        return;
      }
    
      // if (swapStore.fromToken.name && swapStore.toToken.name) {
      //   const checkPool = async () => {
      //     const provider = new ethers.JsonRpcProvider(ETH_SEPOLIA_PROVIDER_URL);
      //     const nadFactory = new NadFactory(provider);
      
      //     const pool = await nadFactory.getPair(swapStore.fromToken.contract, swapStore.toToken.contract);
      //     swapStore.setPoolContractAddress(pool);
      //     if (pool === ZERO_ADDRESS) {
      //       buttonStore.setSwapButton(
      //         "Insufficient Liquidity",
      //         true, 
      //         "bg-nad-bg-03 text-black opacity-50 cursor-none pointer-events-none hover:bg-none hover:text-black"
      //       );
      //     }
      //   };
      //   checkPool();
      // }
      if (Number(swapStore.fromAmount) * 10**6 > Number(swapStore.fromBalance)) {
        buttonStore.setSwapButton("Insufficient Balance", false, 'bg-nad-bg-01 text-white opacity-50 hover:opacity-100 hover:bg-nad-bg-01 hover:text-white');
        return;
      }

      if (Number(swapStore.fromAmount) !== 0 && Number(swapStore.toAmount) !== 0) {
        buttonStore.setSwapButton("Swap", false, 'bg-nad-bg-01 text-white hover:bg-nad-bg-01 hover:text-white');
        return;
      }


      buttonStore.setSwapButton("Swap", true, 'bg-nad-bg-01 text-white opacity-50 hover:opacity-100 hover:bg-nad-bg-01 hover:text-white');
    };

    updateButtonState();

    const disposers = [
      walletStore.onWalletChange(updateButtonState),
    ];

    return () => {
      disposers.forEach(disposer => disposer());
    };
  }, [
    isConnected, 
    buttonStore, 
    walletStore, 
    chainId, 
    swapStore.fromToken,
    swapStore.toToken,
    swapStore.fromAmount,
    swapStore.toAmount,
  ]);

  return <>{children}</>;
});