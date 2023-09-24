import Navbar from '@/components/layouts/navbar.layout';
import { Button } from '@/components/ui/button';
import { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';

export default function ProtectedPage(props: NextPage) {
    const { data: session, status } = useSession();

    console.log(session);

    if (status === 'loading') return <div>Loading...</div>;

    if (status === 'unauthenticated') return <div>Unauthenticated</div>;

    return (
        <Navbar>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold text-center text-gray-800  dark:text-gray-100">
                    Hello{' '}
                    {session?.user?.name ?? session?.user?.email ?? 'there'}
                </h1>
                <Button
                    onClick={() =>
                        signOut({
                            callbackUrl: '/auth/login',
                            redirect: true
                        })
                    }
                >
                    Logout
                </Button>
            </div>
        </Navbar>
    );
}
