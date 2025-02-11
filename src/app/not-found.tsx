'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="mb-4">Sorry, the page you visited does not exist.</p>
      <button
        onClick={() => router.push('/')}
        className="px-4 py-2 bg-nad-bg-01 text-white rounded-md hover:bg-nad-bg-01/80 hover:text-white"
      >
        Back to Home
      </button>
    </div>
  );
}