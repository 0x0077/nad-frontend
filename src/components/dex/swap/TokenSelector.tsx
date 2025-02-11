'use client';

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import DrawAssetIcon from "@components/AssetIcon/DrawAssetIcon";

interface TokenSelectorProps {
  token: {
    symbol: string;
    name: string;
    icon: string;
  };
  onClick?: () => void;
  className?: string;
  isFrom?: boolean; 
}

export const TokenSelector = ({ 
  token, 
  onClick, 
  className,
  isFrom = false
}: TokenSelectorProps) => {
  const hasToken = Boolean(token?.symbol);

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 cursor-pointer h-10 rounded-xl",
        "transition-colors duration-200",
        isFrom && "bg-white text-black",
        !hasToken 
          ? "bg-nad-bg-01 text-white whitespace-nowrap hover:bg-nad-bg-01/90 px-2" 
          : "bg-white text-black hover:bg-white/90 px-2",
        className
      )}
    >
      {hasToken ? (
        <>
          {token.icon ? (
            <div className="relative w-[22px] h-[22px]">
              <Image
                src={token.icon}
                alt={token.symbol}
                width={22}
                height={22}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          ) : (
            <DrawAssetIcon
              assetName={token.name}
              className={cn(
                "w-[22px] h-[22px] rounded-full",
                "bg-primary flex items-center justify-center",
                "text-primary-foreground font-medium text-sm"
              )}
            />
          )}
          <span className="font-medium text-lg">{token.symbol}</span>
        </>
      ) : (
        <span className="text-sm">Select token</span>
      )}
      <ChevronDown className={cn(
        "h-4 w-4",
        hasToken ? "text-black" : "text-white"
      )} />
    </div>
  );
};