'use client';

import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@stores/context';
import { Token, SelectTokenProps } from '@/lib/interface';
import useEthPrice from '@/hooks/useEthPrice';
import useResponsive from '@/hooks/useResponsive';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import DrawAssetIcon from '@components/AssetIcon/DrawAssetIcon';
import Image from 'next/image';
import SearchInput from '@/components/dex/swap/SearchInput';


export const SelectToken: React.FC<SelectTokenProps> = observer(({ onAction, tokens, popularTokens, isFromToken, isSwapAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { swapStore, walletStore } = useStores();
  const isMobile = useResponsive();
  useEthPrice();

  const observerRef = useRef<HTMLDivElement | null>(null);

  const sortedAssets = useMemo(() => {
    return [...tokens]
      .filter(token => token.name.toString() !== "unknown")
      .sort((a, b) => {
        const balanceA = parseFloat(a.balance || '0');
        const balanceB = parseFloat(b.balance || '0');
        if (balanceA > 0 && balanceB === 0) return -1;
        if (balanceA === 0 && balanceB > 0) return 1;
        return balanceB - balanceA;
      });
  }, [tokens]);

  const handleTokenSelect = (token: Token) => {
    if (isSwapAction) {
      const fromToken = swapStore.fromToken;
      const toToken = swapStore.toToken;
      const fromAmount = swapStore.fromAmount;
      const toAmount = swapStore.toAmount;
      const currentToken = isFromToken ? fromToken : toToken;
      const oppositeToken = isFromToken ? toToken : fromToken;

      if (currentToken.contract !== token.contract) {
        if (oppositeToken.contract === token.contract) {
          swapStore.setFromToken(toToken);
          swapStore.setToToken(fromToken);
          swapStore.setFromAmount(toAmount);
          swapStore.setToAmount(fromAmount);
        } else {
          isFromToken ? swapStore.setFromToken(token) : swapStore.setToToken(token);
          swapStore.setFromAmount(fromAmount);
          swapStore.setToAmount(toAmount);
        }
      }
    }
    onAction(token);
  };

  const renderAssetIcon = (asset: Token) => {
    if (asset.icon) {
      return (
        <Image
          src={asset.icon}
          alt={asset.name}
          width={32}
          height={32}
          className="mr-3 rounded-full"
        />
      );
    } else {
      return (
        <DrawAssetIcon assetName={asset.name} className="w-8 h-8 mr-3 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold" />
      );
    }
  };

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      // loadMoreAssets();
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [handleObserver]);

  const renderTokenList = () => {
    const tokensToRender = searchTerm ? sortedAssets.filter(token => token.name.toLowerCase().includes(searchTerm.toLowerCase())) : sortedAssets;

    if (tokensToRender.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full pb-36">
          <Image src="/no-result.svg" alt="No results" width={36} height={36} />
          <p className="mt-4 text-muted-foreground">No assets found</p>
        </div>
      );
    }

    return (
      <>
        <div className="space-y-1">
          {tokensToRender.map((token) => (
            <div
              key={`${token.symbol}-${token.contract}`}
              className="flex items-center justify-between p-2 hover:bg-secondary rounded cursor-pointer transition-colors duration-200"
              onClick={() => handleTokenSelect(token)}
            >
              <div className="flex items-center">
                {renderAssetIcon(token)}
                <div>
                  <div className='text-base'>{token.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {token.symbol || token.contract.slice(0, 10) + '...'}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div>{token.balance === "0" ? "$0" : token.balance}</div>
              </div>
            </div>
          ))}
        </div>
        {/* <div ref={observerRef} className="py-4">
          <Skeleton className="h-12 w-full" />
        </div> */}
      </>
    );
  };

  return (
    <>
      <div className="flex items-center justify-between p-2">
        <span className="text-base">Select a token</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onAction(null)}
          className="h-8 w-8 border-0 hover:border-0 focus:border-0 active:border-0 outline-none hover:bg-transparent"
        >
          <Image src="/close.svg" alt="Close" width={16} height={16} />
        </Button>
      </div>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="flex flex-wrap gap-2 pb-6 border-b-2 border-gray-200">
        {popularTokens.map((symbol) => {
          const token = tokens.find((t) => t.symbol === symbol);
          return (
            token && (
              <Button
                key={symbol}
                variant="outline"
                className="bg-white hover:bg-nad-bg-03 rounded-md py-2 px-3 text-sm flex items-center justify-center border border-gray-300"
                onClick={() => handleTokenSelect(token)}
              >
                <Image
                  src={token.icon}
                  alt={token.symbol}
                  width={20}
                  height={20}
                />
                {token.symbol}
              </Button>
            )
          );
        })}
      </div>
      <div className={cn(
        "flex-1 overflow-y-auto pr-2",
        isMobile ? "h-[calc(100vh-250px)]" : "h-96"
      )}>
        {renderTokenList()}
      </div>
    </>
  );
});