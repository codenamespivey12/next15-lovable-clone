import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { TRPCProvider } from '@/providers/trpc-provider';
import { ErrorBoundary } from '@/components/error-boundary';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <ClerkProvider>
            <TRPCProvider>{children}</TRPCProvider>
          </ClerkProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
