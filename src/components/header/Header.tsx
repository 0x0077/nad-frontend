'use client';

import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@stores/context';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MobileMenu from '@/components/header/MobileMenu';
import WebMenu from '@/components/header/WebMenu';
import AbstractIcon from '@/components/header/CreateAbstractIcon';
import useResponsive from '@/hooks/useResponsive';
import { CustomConnectButton } from '@/components/header/CustomConnectButton';
import Link from 'next/link';
import Image from 'next/image';
import { useWalletStore } from '@/hooks/useWalletStore';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isMobile = useResponsive();
  const { walletStore, disconnect } = useWalletStore();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (path: string) => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
    router.push(path);
  };

  return (
    <header className={cn(
      "flex min-w-full px-4 py-4 md:py-6 transition-all duration-300 bg-white",
      isScrolled && "border-t border-white backdrop-blur-xl"
    )}>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center space-x-4 md:space-x-8'>
          <div className='flex items-center justify-center'>
            <Link href="/">
              <Image src="/icons/full-icon.png" alt='nad finance' width={152} height={152} />
            </Link>
          </div>
          {!isMobile && (
            <nav className='hidden md:flex space-x-6'>
              <WebMenu onLinkClick={handleLinkClick} pathname={pathname} />
            </nav>
          )}
        </div>

        <div className='flex items-center space-x-2 md:space-x-4'>
          {!isMobile && (
            <Button variant="default" className="flex items-center space-x-1 bg-white text-nad-color-01 hover:bg-white hover:text-nad-color-02">
              <Image src="/monad_logo.png" alt='network' width={16} height={16} />
              <span>Monad Testnet</span>
            </Button>
          )}

          {isMobile && (
            <>
              <Button variant="default" className="flex items-center space-x-2">
                <Image src="/icons/full-icon.png" alt='nad finance' width={152} height={152} />
              </Button>
              <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="icon">
                <Image src="/menu.svg" alt='menu' width={24} height={24} />
              </Button>
            </>
          )}
          <CustomConnectButton />

          {/* {!isMobile && (
            walletStore.isConnected ? (
              <div onClick={onDisconnected} className='flex items-center bg-white text-xs rounded-md overflow-hidden text-black'>
                <Button variant="ghost" className='flex items-center space-x-2'>
                  <img src="/eth.png" alt='wallet' width={16} height={16} />
                  <span>{walletStore.formattedBalance || 0.0000} ETH</span>
                </Button>
                <Button variant="outline" className='flex items-center space-x-2'>
                  <AbstractIcon address={walletStore.address?.toString() ?? ""} size={16} />
                  <span>
                    {walletStore.shortAddress}
                  </span>
                </Button>
              </div>
            ) : (
              <Button onClick={connect} variant="outline" className='flex items-center space-x-2'>
                <WalletIcon width={16} height={16} />
                <span>Connect Wallet</span>
              </Button>
            )
          )} */}
        </div>
      </div>

      {isMobile && (
        <div className={cn(
          "fixed inset-0 bg-oxi-bg-02 z-50 px-4 transition-transform duration-300 ease-in-out",
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
          <div className="flex items-center justify-between">
            <Image src="/icons/full-icon.png" alt="nad finance logo" width={120} height={120} />
            <Button onClick={() => setIsMenuOpen(false)} variant="ghost" size="icon">
              <Image src="/close.svg" alt="Close" width={24} height={24} />
            </Button>
          </div>
          <nav className="flex flex-col space-y-1 bg-white rounded-xl p-1">
            <MobileMenu onLinkClick={handleLinkClick} pathname={pathname} />
          </nav>
          <nav className="flex flex-col space-y-1 bg-white rounded-xl p-1 mt-2">
            <div className="flex flex-col space-y-1 bg-white rounded-xl p-1">
              <Link href="https://github.com/nadfinance" target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-between gap-3 rounded-xl bg-oxi-bg-02 px-4 py-3 text-lg text-text-300 transition-colors duration-200 ease-in-out">
                <span>Github</span>
              </Link>
              <Link href="https://discord.gg/nadfinance" target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-between gap-3 rounded-xl bg-oxi-bg-02 px-4 py-3 text-lg text-text-300 transition-colors duration-200 ease-in-out">
                <span>Discord</span>
              </Link>
            </div>
          </nav>
        </div>
      )}

      {isMobile && (
        <>
          <div className="fixed bottom-10 left-0 right-0 border-t-blue-100 border-t-1 p-4"></div>
          <div className="fixed bottom-0 right-0 p-4">
            {walletStore.isConnected ? (
              <div onClick={() => disconnect()} className='flex flex-row items-end bg-white text-sm rounded-md overflow-hidden'>
                <Button variant="ghost" className='flex items-center space-x-2'>
                  <Image src="/favicon.svg" alt='wallet' width={16} height={16} />
                  <span>{walletStore.formattedBalance || 0.0000} ETH</span>
                </Button>
                <Button variant="outline" className='flex items-center space-x-2'>
                  <AbstractIcon address={walletStore.address?.toString() ?? ""} size={16} />
                  <span>
                    {walletStore.shortAddress}
                  </span>
                </Button>
              </div>
            ) : (
              <CustomConnectButton />
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;