'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { CustomJazzicon } from '@/components/header/Jazzicon'
import Image from 'next/image'
import { Button } from '@/components/ui/button'


export const CustomConnectButton = () => {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  };
  
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal} variant="outline" className='flex items-center space-x-2 bg-nad-bg-01 text-white hover:bg-nad-bg-01/80 hover:text-white'>
                    <span>Connect Wallet</span>
                  </Button>
                )
              }

              if (chain.unsupported) {
                return (
                  <button 
                    onClick={openChainModal}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Wrong Network
                  </button>
                )
              }

              return (
                <div className="flex gap-3">
                  <button 
                    onClick={openAccountModal}
                    className="flex items-center gap-2 bg-white text-nad-color-01 text-sm py-2 px-4 rounded-lg border border-nad-color-01 hover:bg-nad-bg-01/10 hover:text-nad-color-01"
                  >
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-600">
                      {account.ensAvatar ? (
                        <Image
                          src={account.ensAvatar}
                          alt="ENS Avatar"
                          width={24}
                          height={24}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <CustomJazzicon 
                          address={account.address} 
                          diameter={24}
                          className="flex items-center justify-center"
                        />
                      )}
                    </div>
                    
                    <span>
                      {account.ensName || formatAddress(account.address)}
                    </span>

                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}