import { useEffect, useCallback, useMemo } from 'react';
import { ethers } from 'ethers';
// import { BaseToken } from '@/components/blockchain/BaseToken';
import { ZERO_ADDRESS, ETH_SEPOLIA_PROVIDER_URL } from '@/lib/interface';
import { useStores } from '@stores/context';
import useSWR from 'swr';

export const useTokenBalance = (
  tokenAddress: string,
  isFrom: boolean,
  refreshInterval = 15000
) => {
  const { walletStore, swapStore } = useStores();
  const provider = new ethers.JsonRpcProvider(ETH_SEPOLIA_PROVIDER_URL);

  const fetchBalance = useCallback(async () => {
    if (!walletStore.address) {
      return '0';
    }

    try {
      // if (tokenAddress === ZERO_ADDRESS && isFrom) {
      //   return walletStore.balance || '0';
      // if (tokenAddress.length >= 42 && tokenAddress !== ZERO_ADDRESS) {
      //   const baseToken = new BaseToken(provider, tokenAddress);
      //   const balance = await baseToken.getBalance(walletStore.address);
      //   isFrom ? swapStore.setFromBalance(balance.toString()) : swapStore.setToBalance(balance.toString());
      //   return balance.toString();
      // }
      return '0';
    } catch (error) {
      console.error('Error fetching balance:', error);
      return '0';
    }
  }, [walletStore.address, tokenAddress, isFrom, walletStore.balance]);

  const { data: balance, mutate } = useSWR(
    walletStore.address ? `balance-${tokenAddress}-${walletStore.address}` : null,
    fetchBalance,
    {
      refreshInterval, 
      refreshWhenHidden: false, 
      revalidateOnFocus: true, 
    }
  );

  const refreshBalance = useCallback(() => {
    mutate();
  }, [mutate]);


  const formattedBalance = (decimals: number) => {
    if (!balance || balance === '0') return '0';
    const balanceInEth = parseFloat(balance) / Math.pow(10, decimals); 
    const formattedBalance = balanceInEth.toFixed(4);
    return `${formattedBalance}`;
  };


  return {
    balance: balance || '0',
    refreshBalance,
    formattedBalance,
  };
};