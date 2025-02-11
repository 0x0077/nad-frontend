'use client';

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { TokenSelector } from '@/components/dex/swap/TokenSelector';
import { TokenInfo } from '@/components/dex/swap/TokenInfo';
import { useTokenBalance } from '@/hooks/useTokenBalance';

interface TokenInputBaseProps {
  loading: boolean;
  amount: string;
  placeholder: string;
  readOnly: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTokenCardOpen: () => void;
  token: any;
  price: string;
  priceImpact?: string;
  isFrom: boolean;
}

export const TokenInputBase: React.FC<TokenInputBaseProps> = ({
  loading,
  amount,
  placeholder,
  readOnly,
  onChange,
  onTokenCardOpen,
  token,
  price,
  priceImpact,
  isFrom,
}) => {
  const { balance, formattedBalance } = useTokenBalance(token.contract, isFrom);

  return (
    <div className={cn(
      "bg-card p-6 rounded-2xl bg-nad-bg-03",
      isFrom ? "mt-4 mb-2" : ""
    )}>
      <div className="flex justify-between items-center">
        {loading ? (
          <Skeleton className="h-9 w-2/3" />
        ) : (
          <Input
            type="text"
            inputMode="decimal"
            autoComplete="off"
            autoCorrect="off"
            min={0}
            value={amount}
            placeholder={placeholder}
            onChange={onChange}
            readOnly={readOnly}
            className={cn(
              "font-basel-grotesk-book bg-transparent",
              "text-2xl md:text-2xl text-black",
              "w-full appearance-none p-0",
              "border-0 shadow-none outline-none ring-0 focus-visible:ring-0 focus:outline-none",
              "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
              readOnly && "cursor-not-allowed opacity-50"
            )}
          />
        )}

        <div className="flex items-center gap-2 cursor-pointer">
          <TokenSelector 
            token={token}
            onClick={onTokenCardOpen}
            isFrom={isFrom}
          />
        </div>
      </div>

      <div className="flex justify-between mt-2">
        {loading ? (
          <div className="flex justify-between w-full">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        ) : (
          <TokenInfo 
            price={price} 
            balance={formattedBalance(token.decimals)} 
            priceImpact={priceImpact} 
            toAmount={isFrom ? "" : amount} 
          />
        )}
      </div>
    </div>
  );
};