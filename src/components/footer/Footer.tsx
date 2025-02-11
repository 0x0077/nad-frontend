'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useResponsive from '@/hooks/useResponsive';
import { ethers } from 'ethers';
import { ETH_SEPOLIA_PROVIDER_URL } from '@/lib/interface';

const Footer: React.FC = () => {
  const [currentBlockNumber, setCurrentBlockNumber] = useState<string>('');
  const isMobile = useResponsive();

  const handleBlock = async () => {
    try {
      const provider = new ethers.JsonRpcProvider(ETH_SEPOLIA_PROVIDER_URL);
      const blockNumber = await provider.getBlockNumber();
      setCurrentBlockNumber(blockNumber.toString());
    } catch (error) {
      console.error('Failed to fetch block number:', error);
    }
  };

  useEffect(() => {
    handleBlock();
    const intervalId = setInterval(handleBlock, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {!isMobile && (
        <footer className="absolute bottom-4 left-0 right-0 text-gray-600 py-4 px-8 flex justify-between items-center text-sm">
          <Link href="https://monad.xyz/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
            <Image src="/monad_logo.png" alt="Monad" width={16} height={16} />
            <span className="text-text-300 hover:text-blue-500">Powered by Monad</span>
            <span>© 2025 Nad Finance</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Link href="https://github.com/nadfinance" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
              <Image src="/github.svg" alt="GitHub" width={16} height={16} />
            </Link>
            <Link href="https://discord.gg/nadfinance" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
              <Image src="/discord.svg" alt="Discord" width={16} height={16} />
            </Link>
            <Link href="https://x.com/nad_finance" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
              <Image src="/x.svg" alt="X" width={16} height={16} />
            </Link>
            <Link href="https://nad-finance.gitbook.io/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
              <Image src="/gitbook.svg" alt="Gitbook" width={16} height={16} />
            </Link>
            <Link href={`https://sepolia.etherscan.io/block/${currentBlockNumber}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-nad-color-01 transition-colors flex items-center space-x-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nad-bg-01 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-nad-bg-01"></span>
              </span>
              <span>{currentBlockNumber}</span>
            </Link>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;