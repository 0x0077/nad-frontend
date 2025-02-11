'use client';

import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@stores/context';
import { useSwapInput } from '@/hooks/useSwapInput';
import { Token } from '@/lib/interface';
import { TokenInputBase } from '@/src/components/dex/swap/TokenInputBase';



interface ToTokenInputProps {
  onTokenCardOpen: () => void;
  toToken: Token;
}

export const ToTokenInput: React.FC<ToTokenInputProps> = observer(({ onTokenCardOpen, toToken }) => {
  const { swapStore, walletStore } = useStores();

  return (
    <div className="relative">
      <TokenInputBase
        loading={swapStore.toLoading}
        amount={swapStore.toAmount}
        placeholder="0.00"
        readOnly={true}
        onChange={() => {}}
        onTokenCardOpen={onTokenCardOpen}
        token={toToken}
        price={"0"}
        priceImpact={swapStore.priceImpact}
        isFrom={false}
      />
      
      {Number(swapStore.priceImpact) > 5 && (
        <div className="absolute -bottom-6 left-0 right-0 text-xs text-destructive text-center">
          High price impact! The trade will result in significant loss.
        </div>
      )}
    </div>
  );
});