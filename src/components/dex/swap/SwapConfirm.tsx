'use client';

import { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@stores/context';
import { SwapConfirmProps } from '@/lib/interface';
import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SwapButton } from '@/components/dex/swap/SwapButton';
import { formattedBalance } from '@/lib/Helper';
import { motion, AnimatePresence } from "framer-motion";
import SwapPending from '@/components/dex/swap/SwapPending';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
// import { TEST_SWAP_ADDRESS, TEST_SWAP_ABI } from '@/blockchain/constants';

const ReviewItem: React.FC<Pick<SwapConfirmProps, 'reviewInfo'>> = observer(({
  reviewInfo,
}) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <div className="relative w-8 h-8">
          <img
            src={reviewInfo.icon}
            alt={reviewInfo.symbol}
            className="w-full h-full rounded-full"
          />
        </div>
        <div>
          <div className="font-semibold">{reviewInfo.name}</div>
          <div className="text-sm text-muted-foreground">{reviewInfo.balance}</div>
        </div>
      </div>
      <div className="text-right">
        <div>{reviewInfo.amount}</div>
        <div className="text-muted-foreground">{reviewInfo.value}</div>
      </div>
    </div>
  );
});

const SwapDetailItem: React.FC<Pick<SwapConfirmProps, 'swapDetailInfo'>> = observer(({
  swapDetailInfo,
}) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{swapDetailInfo.title}</span>
      <div className="text-sm">{swapDetailInfo.value}</div>
    </div>
  );
});



export const SwapConfirm: React.FC<Pick<SwapConfirmProps, 'onAction'>> = observer(({
  onAction,
}) => {
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { swapStore, notificationStore, walletStore } = useStores();
  const { writeContract, isPending: isSwapPending, data: hash, error } = useWriteContract();
  const [notifiId, setNotifiId] = useState('');

  const { isLoading: isConfirming, isSuccess, data: receipt } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSwapSuccess = useCallback(() => {
    notificationStore.updateNotification(notifiId, {
      status: 'success',
      title: 'Transaction Successful',
      message: `Successfully swapped ${swapStore.fromAmount} ${swapStore.fromToken.name} for ${swapStore.toAmount} ${swapStore.toToken.name}`,
    });
    onAction();
  }, [notifiId, swapStore, notificationStore, onAction]);

  const handleClose = () => {
    onAction();
    notificationStore.clearAllNotifications();
  };

  useEffect(() => {
    if (isSuccess && receipt) {
      setIsPending(false);
      handleSwapSuccess();

    }
  }, [isSuccess, receipt, handleSwapSuccess]);

  useEffect(() => {
    if (error) {
      setIsPending(false);
      notificationStore.updateNotification(notifiId, {
        status: 'error',
        title: 'Transaction Failed',
        message: 'Transaction failed',
        open: true
      });
    }
  }, [error, notificationStore]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);


  const handleSwap = async () => {
    setIsPending(true);

    try {
      // writeContract({
      //   abi: TEST_SWAP_ABI,
      //   address: TEST_SWAP_ADDRESS,
      //   functionName: 'swap',
      //   args: [
      //     BigInt(swapStore.fromAmount) * BigInt(10 ** swapStore.fromToken.decimals),
      //     BigInt(0),
      //     [swapStore.fromToken.contract, swapStore.toToken.contract]
      //   ],
      // });

      const id = notificationStore.addNotification({
        title: 'Transaction Pending',
        message: `Swapping ${swapStore.fromAmount} ${swapStore.fromToken.name} for ${swapStore.toAmount} ${swapStore.toToken.name}`,
        status: 'pending',
      });

      setNotifiId(id);
  
    } catch (error) {
      console.error(error);
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between p-2">
        <span className="text-base">
          {isPending ? "Confirm swap" : "Confirm Swap"}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onAction}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {!isPending ? (
          <motion.div
            key={`swap-confirm-state-`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-2 p-2"
          >

            <div className="space-y-2 p-2">
              {/* You pay section */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-2">You pay</h3>
                  {swapStore.fromLoading ? (
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[100px]" />
                      </div>
                    </div>
                  ) : (
                    <ReviewItem
                      key={`from-${swapStore.fromToken.symbol}`}
                      reviewInfo={{
                        name: swapStore.fromToken.name,
                        symbol: swapStore.fromToken.symbol,
                        icon: swapStore.fromToken.icon,
                        balance: formattedBalance(swapStore.fromBalance, swapStore.fromToken.decimals),
                        amount: swapStore.fromAmount,
                        value: `$${0}`,
                      }}
                    />
                  )}
                </CardContent>
              </Card>

              {/* You will get section */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="mb-2">You will get</h3>
                  {swapStore.toLoading ? (
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-4 w-[100px]" />
                      </div>
                    </div>
                  ) : (
                    <ReviewItem
                      key={`to-${swapStore.toToken.symbol}`}
                      reviewInfo={{
                        name: swapStore.toToken.name,
                        symbol: swapStore.toToken.symbol,
                        icon: swapStore.toToken.icon,
                        balance: formattedBalance(swapStore.toBalance, swapStore.toToken.decimals),
                        amount: swapStore.toAmount,
                        value: `$${0}`,
                      }}
                    />
                  )}
                </CardContent>
              </Card>

              {/* Swap details section */}
              <Card>
                <CardContent className="p-4 space-y-2">
                  {isLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ) : (
                    <>
                      <SwapDetailItem
                        swapDetailInfo={{
                          title: 'Price impact',
                          value: swapStore.priceImpact,
                        }}
                      />
                      <SwapDetailItem
                        swapDetailInfo={{
                          title: 'Max slippage',
                          value: `${swapStore.maxSlippage} ($${(
                            Number(swapStore.maxSlippage) * 
                            Number(swapStore.swapRateValue) / 
                            Number(swapStore.swapRate)
                          ).toFixed(2)})`,
                        }}
                      />
                      <SwapDetailItem
                        swapDetailInfo={{
                          title: 'Min received',
                          value: `${swapStore.minReceived} ${swapStore.toToken.symbol}`,
                        }}
                      />
                      <SwapDetailItem
                        swapDetailInfo={{
                          title: 'Route',
                          value: swapStore.fromToken.name + ' -> ' + swapStore.toToken.name,
                        }}
                      />
                    </>
                  )}
                </CardContent>
              </Card>

              <SwapButton onAction={handleSwap} />
            </div>
          </motion.div>
        ) : (
          <SwapPending onAction={handleClose} />
        )}
      </AnimatePresence>
    </>
  );
});