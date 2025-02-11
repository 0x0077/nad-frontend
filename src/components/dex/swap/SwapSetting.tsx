'use client';

import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import useResponsive from "@/hooks/useResponsive";
import { SwapSettingProps } from "@/lib/interface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlippageButtonProps extends Pick<SwapSettingProps, 'value' | 'onAction' | 'isChecked'> {
  className?: string;
}

const SlippageButton: React.FC<SlippageButtonProps> = observer(({ 
  value, 
  onAction, 
  isChecked,
  className 
}) => {
  return (
    <Button
      variant={isChecked ? "secondary" : "outline"}
      onClick={onAction}
      className={cn(
        "h-12 text-sm font-medium",
        isChecked && "border-primary",
        className
      )}
    >
      {value}
    </Button>
  );
});

export const SwapSetting: React.FC<Pick<SwapSettingProps, 'onAction'>> = observer(({ onAction }) => {
  const isMobile = useResponsive();
  const [slippage, setSlippage] = useState<string>("0.5");
  const [isAuto, setIsAuto] = useState(false);


  const handleClose = () => {
    onAction();
  };

  const handleSlippage = (value: string, auto: boolean = false) => {
    setSlippage(value);
    setIsAuto(auto);
  };

  const isSlippageSelected = (value: string, auto: boolean = false) => {
    return slippage === value && isAuto === auto;
  };

  return (
    <>
      <div className="flex items-center justify-between p-2 mb-1">
        <span className="text-base">Swap settings</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4 p-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">Slippage</span>
          <span className="text-sm text-muted-foreground">
            {isAuto ? 'Auto 1%' : `${slippage}%`}
          </span>
        </div>

        <div className={cn(
          "grid gap-2 p-1 rounded-lg border",
          isMobile ? "grid-cols-3" : "grid-cols-6"
        )}>
          <SlippageButton 
            value="Auto" 
            onAction={() => handleSlippage("1", true)} 
            isChecked={isSlippageSelected("1", true)}
          />
          <SlippageButton 
            value="0.1%" 
            onAction={() => handleSlippage("0.1")} 
            isChecked={isSlippageSelected("0.1")}
          />
          <SlippageButton 
            value="0.5%" 
            onAction={() => handleSlippage("0.5")} 
            isChecked={isSlippageSelected("0.5")}
          />
          <SlippageButton 
            value="1%" 
            onAction={() => handleSlippage("1")} 
            isChecked={isSlippageSelected("1")}
          />
          <SlippageButton 
            value="3%" 
            onAction={() => handleSlippage("3")} 
            isChecked={isSlippageSelected("3")}
          />
          <Input
            type="text"
            inputMode="decimal"
            placeholder="Custom"
            value={isAuto ? '' : (Number(slippage) > 49 ? '49' : slippage)}
            className={cn(
              "h-12 text-center",
              !isAuto && !["0.1", "0.5", "1", "3"].includes(slippage) && "bg-secondary"
            )}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '') {
                handleSlippage("1", true);
              } else {
                handleSlippage(Number(value) > 49 ? '49' : value);
              }
            }}
          />
        </div>
      </div>
    </>
  );
});