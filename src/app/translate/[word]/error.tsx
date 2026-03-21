'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <h2 className="text-2xl font-bold text-white">Something went wrong!</h2>
      <p className="text-slate-400">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-[#BC0000] text-white rounded-md hover:bg-[#8B0000] transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
