'use client';

import { observer } from "mobx-react-lite";
import { useStores } from "@stores/context";
import { ButtonProps } from "@/lib/interface";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const SwapHeader: React.FC<Pick<ButtonProps, 'onAction'>> = observer(({ onAction }) => {

  return (
    <div className="flex items-center justify-between px-2">
      <h2 className="text-lg font-medium ml-2">Swap</h2>
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        onClick={onAction}
      >
        <span>{0}%</span>
        <Image 
          src="/setting.svg"
          alt="setting"
          width={16}
          height={16}
          className="hover:rotate-90 transition-all duration-300"
        />

      </Button>
    </div>
  );
});