import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';
import { Poppins } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps as NextAppProps } from 'next/app';

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            cacheTime: 1000 * 60 * 60 * 24
        }
    }
});

type AppProps = NextAppProps & {
    session?: Session | null;
};

export default function App({ Component, pageProps, session }: AppProps) {
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <main className={poppins.className}>
                    <Component {...pageProps} />
                </main>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
            <Toaster />
        </SessionProvider>
    );
}
