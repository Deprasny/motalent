import '@/styles/globals.css';
import { Poppins } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] });

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            cacheTime: 1000 * 60 * 60 * 24
        }
    }
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <main className={poppins.className}>
                <Component {...pageProps} />
            </main>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
