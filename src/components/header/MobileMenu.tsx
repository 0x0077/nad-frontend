'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from 'next/link';

interface MobileMenuProps {
  onLinkClick: (path: string) => void;
  pathname: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onLinkClick, pathname }) => {
  const menuItems = [
    { label: 'Trade', path: '/swap' },
    { label: 'Explore', path: '/explore/pool' },
    { label: 'Pool', path: '/pool' },
    { label: 'Points', path: '/points', soon: true },
    { label: 'Bridge', path: 'https://monad.xyz/', external: true },
  ];

  return (
    <>
      {menuItems.map((item) => (
        item.external ? (
          <div
            key={item.label}
            className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl bg-oxi-bg-02 px-4 py-3 text-lg text-text-300 transition-colors duration-200 ease-in-out"
          >
            <Link
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-300 w-full"
            >
              <span>{item.label}</span>
            </Link>
          </div>
        ) : (
          <div
            key={item.label}
            className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl bg-oxi-bg-02 px-4 py-3 text-lg text-text-300 transition-colors duration-200 ease-in-out"
          >
            <Button
              onClick={() => onLinkClick(item.path)}
              variant="ghost"
              className={cn(
                "transition-colors",
                pathname === item.path || (item.path === '/swap' && pathname === '/') ? 'text-nad-color-01' : 'text-text-300 hover:text-nad-color-01'
              )}
            >
              <span>{item.label}</span>
              {item.soon && (
                <div className="flex items-center ml-2">
                  <div
                    className="min-w-[40px] h-5 px-2 bg-nad-bg-01 rounded-full flex items-center justify-center text-[10px] text-white"
                    title="Points feature coming soon"
                    aria-label="Points feature coming soon"
                  >
                    Soon
                  </div>
                </div>
              )}
            </Button>
          </div>
        )
      ))}
    </>
  );
};

export default MobileMenu;