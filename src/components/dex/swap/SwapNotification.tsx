'use client';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Notification } from '@/lib/interface';
import { useStores } from '@stores/context';
import Image from 'next/image';
import TickIcon from '@/assets/icons/tickIcon';

const SwapNotification = observer(() => {
  const { notificationStore } = useStores();

  useEffect(() => {
    notificationStore.setupReactions();
    return () => {
      notificationStore.dispose();
    };
  }, [notificationStore]);

  const renderNotificationContent = (notif: Notification) => {
    const isPending = notif.status === 'pending';
    return (
      <div className={`flex flex-row p-4 relative rounded-lg shadow-md mb-2 
        transition-all duration-300 bg-white`}>
        
        <div className="flex items-center">
          {isPending ? (
            <div className="animate-spin">
              <Image src="tx-pending.svg" alt="loading" width={24} height={24} />
            </div>
          ) : (
            <TickIcon size={24} />
          )}
          
          <div className="ml-3">
            <p className="text-sm font-medium">
              {isPending ? 'Transaction Processing' : 'Transaction Completed'}
            </p>
            <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`fixed top-24 right-8 z-[100] transition-opacity duration-300
      ${notificationStore.hasPendingNotifications ? 'opacity-100' : 'opacity-0'}`}>
      
      {notificationStore.notifications.map((notif, index) => (
        <div
          key={notif.id}
          className={`transform transition-all duration-300 ease-out
            ${notif.open ? 'translate-x-0' : 'translate-x-full'}
            ${index > 0 ? 'mt-2' : ''}`}
          style={{ transitionDelay: `${index * 50}ms` }}>
          {renderNotificationContent(notif)}
        </div>
      ))}
    </div>
  );
});

export default SwapNotification;