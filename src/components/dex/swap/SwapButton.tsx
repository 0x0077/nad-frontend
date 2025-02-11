'use client';

import { observer } from 'mobx-react-lite';
import { useStores } from '@stores/context';
import { ButtonProps } from '@/lib/interface';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const SwapButton: React.FC<Pick<ButtonProps, 'onAction'>> = observer(({ onAction }) => {
  const { buttonStore } = useStores();

  const getButtonVariant = () => {
    if (buttonStore.swapButton.text === 'Connect Wallet') {
      return 'outline';
    }
    if (buttonStore.swapButton.disabled) {
      return 'secondary';
    }
    return 'default';
  };

  const getExtraClasses = () => {
    const baseClasses = "w-full text-base py-6 mt-2 rounded-2xl font-medium transition-all";
    
    if (buttonStore.swapButton.disabled) {
      return cn(baseClasses, "opacity-50 cursor-not-allowed");
    }

    return cn(
      baseClasses,
      "hover:shadow-md active:scale-[0.99]",
      buttonStore.swapButton.className
    );
  };

  console.log(buttonStore.swapButton.className);
  return (
    <Button
      onClick={onAction}
      disabled={buttonStore.swapButton.disabled}
      variant={getButtonVariant()}
      className={getExtraClasses()}
    >
      {buttonStore.swapButton.text}
    </Button>
  );
});