'use client';

import { Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface TokenInfoProps {
  price: string;
  balance: string;
  priceImpact?: string;
  toAmount?: string;
}

export const TokenInfo: React.FC<TokenInfoProps> = ({ 
  price, 
  balance, 
  priceImpact, 
  toAmount 
}) => {
  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center">
        <span className="text-sm text-muted-foreground">
          ${price === undefined || price === 'NaN' ? '0.00' : price}
        </span>
        {toAmount !== "" && toAmount !== "0" && (
          <span className={cn(
            "text-sm ml-1",
            Number(priceImpact) > 5 ? "text-destructive" : "text-muted-foreground"
          )}>
            (-{priceImpact}%)
          </span>
        )}
      </div>
      <div className="flex items-center cursor-pointer">
        <span className="text-sm text-muted-foreground mr-2">{balance === 'NaN' || balance === 'undefined' ? '0' : balance}</span>
        <Wallet className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};