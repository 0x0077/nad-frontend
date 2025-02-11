'use client';

import { ButtonProps } from '@/lib/interface';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion } from 'framer-motion';


const SwapPending: React.FC<Pick<ButtonProps, 'onAction'>> = ({ onAction }) => {
  return (
    // <motion.div
    //   key="swap-pending-state"
    //   initial={{ opacity: 0, y: 20 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   exit={{ opacity: 0, y: -20 }}
    //   transition={{ duration: 0.2 }}
    //   className="space-y-4 p-2"
    // >
    <div className="flex flex-col items-center space-y-6 pt-8 pb-2">
      <img src="/tx-pending.svg" alt="txPending" width={96} height={96} className="mb-2" />
      <span className="text-base text-muted-foreground text-center px-4 pb-4">
        Please, sign transaction in your wallet
      </span>
      <Button onClick={onAction} className="w-full h-12 bg-nad-bg-01 text-white hover:bg-nad-bg-01/80">
        Close
      </Button>
    </div>
    // </motion.div>
  );
};

const SwapCancelled: React.FC<Pick<ButtonProps, 'onAction'>> = ({ onAction }) => {
  return (
    <>
      <div className="flex items-center justify-between p-2 mb-1">
        <span className="text-base">Transaction cancelled</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onAction}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4 p-2">
        <div className="flex flex-col items-center">
          <img src="/swap-cancel.svg" alt="txPending" className="w-24 h-24" />
        </div>
      </div>
    </>
  );
};

export default SwapPending;
export { SwapCancelled };