'use client';

import { observer } from 'mobx-react-lite';
import { useStores } from '@stores/context';
import { useSwapInput } from '@/hooks/useSwapInput';
import { ZERO_ADDRESS, Token } from '@/lib/interface';
import { TokenInputBase } from '@/components/dex/swap/TokenInputBase';

interface FromTokenInputProps {
  onTokenCardOpen: () => void;
  fromToken: Token;
}

export const FromTokenInput: React.FC<FromTokenInputProps> = observer(({ onTokenCardOpen, fromToken }) => {
  const { swapStore, walletStore } = useStores();
  const { handleInputChange } = useSwapInput();

  return (
    <TokenInputBase
      loading={swapStore.fromLoading}
      amount={swapStore.fromAmount}
      placeholder="0.00"
      readOnly={false}
      onChange={handleInputChange}
      onTokenCardOpen={onTokenCardOpen}
      token={fromToken}
      price={"0"}
      isFrom={true}
    />
  );
});