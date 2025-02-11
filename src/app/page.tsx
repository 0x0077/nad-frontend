import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { SwapSkeleton } from './swap/SwapSkeleton';

const SwapPage = dynamic(() => import('./swap/page'), {
  ssr: false,
  loading: () => <SwapSkeleton />
});

export const runtime = "edge";

export default function Page() {
  return (
    <Suspense fallback={<SwapSkeleton />}>
      <SwapPage />
    </Suspense>
  );
}