'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from 'next/link';

interface WebMenuProps {
  onLinkClick: (path: string) => void;
  pathname: string;
}

const WebMenu: React.FC<WebMenuProps> = ({ onLinkClick, pathname }) => {
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
          <Link key={item.label} href={item.path} target="_blank" rel="noopener noreferrer">
            <Button
              variant="ghost"
              className="transition-colors px-2 text-black hover:text-nad-color-01"
            >
              <span>{item.label}</span>
            </Button>
          </Link>
        ) : (
          <Button
            key={item.label}
            onClick={() => onLinkClick(item.path)}
            variant="ghost"
            className={cn(
              "transition-colors px-2",
              pathname === item.path || (item.path === '/swap' && pathname === '/') ? 'text-nad-color-01' : 'text-black hover:text-nad-color-01'
            )}
          >
            <span>{item.label}</span>
            {item.soon && (
              <div className="flex items-center">
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
        )
      ))}
    </>
  );
};

export default WebMenu;