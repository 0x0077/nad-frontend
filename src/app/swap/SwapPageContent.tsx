'use client';

import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@stores/context';
import { TokenConfig } from "@/lib/interface";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SwapCard from '@/components/dex/swap/SwapCard';
import { SelectToken } from '@/components/dex/swap/SelectToken';
import { SwapConfirm } from '@/components/dex/swap/SwapConfirm';
import { SwapSetting } from '@/components/dex/swap/SwapSetting';
import SwapNotification from '@/components/dex/swap/SwapNotification';
import { cn } from '@/lib/utils';
import { useWalletStore } from '@/hooks/useWalletStore';

interface SwapPageContentProps {
  initialTokenConfig: TokenConfig;
}

export const SwapPageContent = observer(({ initialTokenConfig }: SwapPageContentProps) => {
  const [dialogState, setDialogState] = useState({
    token: false,
    swap: false,
    settings: false,
    pending: false,
  });

  const [isFromToken, setIsFromToken] = useState(false);
  const { swapStore, buttonStore, notificationStore } = useStores();
  const { openConnectModal } = useWalletStore();

  useEffect(() => {
    async function initializeAssets() {
      try {
        swapStore.setTokens(initialTokenConfig.tokens);
      } catch (error) {
        console.error('Failed to fetch token config:', error);
      }
    }
    initializeAssets();
  }, []);

  const toggleDialog = (dialog: keyof typeof dialogState, state: boolean) => {
    setDialogState(prev => ({ ...prev, [dialog]: state }));
  };

  const handleTokenCardOpen = (isFrom: boolean) => {
    setIsFromToken(isFrom);
    toggleDialog('token', true);
  };

  return (
    <main className={cn(
      "flex flex-col items-center py-16 md:py-20 mx-8 bg-nad-bg-03 border-2 border-nad-color-01 rounded-2xl",
      "min-h-[calc(100vh-theme(spacing.header)-theme(spacing.footer))]",
      "max-h-[calc(100vh-theme(spacing.header)-theme(spacing.footer))]"
    )}>
      <SwapCard
        onTokenCardOpen={handleTokenCardOpen}
        onSwapClose={() => toggleDialog('swap', true)}
        onConnectOpen={() => openConnectModal?.()}
        onSetClose={() => toggleDialog('settings', true)}
      />
      <Dialog open={dialogState.token} onOpenChange={(open) => toggleDialog('token', open)}>
        <DialogContent className="sm:max-w-[500px] p-4" hideCloseButton>
          <SelectToken
            onAction={() => toggleDialog('token', false)}
            tokens={swapStore.tokens}
            popularTokens={initialTokenConfig.popularTokens}
            isFromToken={isFromToken}
            isSwapAction={true}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={dialogState.swap} onOpenChange={(open) => toggleDialog('swap', open)}>
        <DialogContent className="sm:max-w-[500px] p-2" hideCloseButton>
          <SwapConfirm
            onAction={() => toggleDialog('swap', false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={dialogState.settings} onOpenChange={(open) => toggleDialog('settings', open)}>
        <DialogContent className="sm:max-w-[500px] p-2" hideCloseButton>
          <SwapSetting onAction={() => toggleDialog('settings', false)} />
        </DialogContent>
      </Dialog>

      <SwapNotification />
    </main>
  );
});