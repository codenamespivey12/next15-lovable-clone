'use client';

import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc/client';
import Link from 'next/link';

export default function Home() {
  // Use a conditional to check if we're in a browser environment
  const { data, isLoading } = trpc.hello.useQuery({ name: 'visitor' }, {
    // Disable the query during SSR
    enabled: typeof window !== 'undefined',
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col">
        <h1 className="text-4xl font-bold mb-8">Welcome to Next.js 15</h1>
        
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <p className="mb-4">{data?.greeting || 'Hello world!'}</p>
        )}
        
        <div className="flex gap-4 mt-8">
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
