import 'server-only';

import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { cache } from 'react';

import { createTRPCContext } from './init';
import { appRouter } from './routers/_app';

/**
 * This is how you create a server-side tRPC client.
 * You can use this from server components to call your tRPC procedures.
 */
export const createServerClient = cache(() => {
  return createTRPCProxyClient({
    links: [
      httpBatchLink({
        url: `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/api/trpc`,
      }),
    ],
    transformer: {
      input: (data) => data,
      output: (data) => data,
    },
  });
});

export const trpc = createServerClient();
