'use client';

import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@stores/context";
import { SwapDetailProps } from "@/lib/interface";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const SwapDetailRow: React.FC<Pick<SwapDetailProps, 'title' | 'value' | 'price'>> = observer(
  ({ title, value, price }) => {
    return (
      <div className="flex items-center justify-between px-4">
        <span className="text-xs text-muted-foreground">{title}</span>
        <div className="text-xs">
          {value} {price}
        </div>
      </div>
    );
  }
);

export const SwapDetail: React.FC<Pick<SwapDetailProps, 'isExpanded' | 'setIsExpanded'>> = observer(
  ({ isExpanded, setIsExpanded }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { swapStore } = useStores();

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }, []);

    const hasValidTokens = swapStore.fromToken.symbol && swapStore.toToken.symbol;

    return (
      <Collapsible
        open={isExpanded}
        onOpenChange={setIsExpanded}
        className="bg-card mt-2 rounded-xl transition-all duration-300 hover:shadow-sm"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full p-4 flex items-center justify-between hover:bg-accent rounded-xl"
          >
            <div className="flex items-center text-xs md:text-sm">
              {isLoading ? (
                <Skeleton className="h-4 w-40" />
              ) : hasValidTokens ? (
                <div className="flex items-center space-x-1">
                  <span>1 {swapStore.fromToken.symbol}</span>
                  <span className="text-muted-foreground">=</span>
                  <span>
                    {swapStore.swapRate !== "NaN" ? swapStore.swapRate : '0'} {swapStore.toToken.symbol}
                  </span>
                  <span className="text-muted-foreground">
                    (~${swapStore.swapRateValue})
                  </span>
                </div>
              ) : (
                <span>-</span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-muted-foreground">Details</span>
              <ChevronDown 
                className={`h-4 w-4 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </div>
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-2 py-2">
          {isLoading ? (
            <div className="space-y-2 px-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            hasValidTokens ? (
              <>
                <SwapDetailRow 
                  title="Price impact" 
                  value={`${swapStore.priceImpact}%`} 
                  price="" 
                />
                <SwapDetailRow
                  title="Max slippage"
                  value={swapStore.maxSlippage === 'NaN' ? '' : swapStore.maxSlippage}
                  price={`($${calculateSlippagePrice(
                    swapStore.maxSlippage,
                    swapStore.swapRateValue,
                    swapStore.swapRate
                  )})`}
                />
                <SwapDetailRow
                  title="Min received"
                  value={swapStore.minReceived === 'NaN' ? '' : swapStore.minReceived}
                  price={swapStore.toToken.symbol}
                />
                <SwapDetailRow 
                  title="Route" 
                  value={swapStore.routePath} 
                  price="" 
                />
              </>
            ) : (
              <>
                <SwapDetailRow title="Price impact" value="-" price="" />
                <SwapDetailRow title="Max slippage" value="-" price="" />
                <SwapDetailRow title="Min received" value="-" price="" />
                <SwapDetailRow title="Route" value="-" price="" />
              </>
            )
          )}
        </CollapsibleContent>
      </Collapsible>
    );
  }
);

// 辅助函数：计算滑点价格
function calculateSlippagePrice(
  maxSlippage: string,
  swapRateValue: string,
  swapRate: string
): string {
  const calculated = (
    (Number(maxSlippage) * Number(swapRateValue)) /
    Number(swapRate)
  ).toFixed(2);
  return calculated === 'NaN' ? '-' : calculated;
}