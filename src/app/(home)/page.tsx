'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc/client';

export default function Home() {
  const [greeting, setGreeting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Use trpc in a try/catch block to handle errors gracefully
  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        // Only run on client
        if (typeof window === 'undefined') return;
        
        setIsLoading(true);
        const result = await trpc.hello.useQuery({ name: 'visitor' }).data;
        if (result) {
          setGreeting(result.greeting);
        } else {
          setGreeting('Hello world!');
        }
      } catch (err) {
        console.error('Failed to fetch greeting:', err);
        setError('Failed to load data');
        setGreeting('Hello world!');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGreeting();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col">
        <h1 className="text-4xl font-bold mb-8">Welcome to Next.js 15</h1>
        
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500 mb-4">{error}</p>
        ) : (
          <p className="mb-4">{greeting || 'Hello world!'}</p>
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
