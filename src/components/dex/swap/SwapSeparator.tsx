'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";

interface SwapSeparatorProps {
  onClick: () => void;
}

export const SwapSeparator: React.FC<SwapSeparatorProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="icon"
      className="absolute left-1/2 top-1/2 mt-2 transform -translate-x-1/2 -translate-y-1/2 z-10"
    >
      <div className="bg-card bg-nad-bg-03 border-4 border-background rounded-lg p-1.5">
        <Image
          src="/swap-separator.svg"
          alt="separator"
          width={16}
          height={16}
          className="hover:rotate-180 transition-transform duration-300"
        />
      </div>
    </Button>
  );
};