import { Metadata } from 'next';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/shared/atoms/motalent-button';
// import { UserAuthForm } from "@/app/examples/authentication/components/user-auth-form"

export const metadata: Metadata = {
    title: 'Authentication',
    description: 'Authentication forms built using the components.'
};

interface Props {
    children: React.ReactNode;
    type: 'login' | 'register';
}

export default function AuthenticationPage({
    children,
    type = 'register'
}: Props) {
    const renderAuthStateComponent = {
        login: {
            title: 'Register',
            href: '/auth/register'
        },
        register: {
            title: 'Login',
            href: '/auth/login'
        }
    }[type];

    return (
        <>
            <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
                <Link
                    href={renderAuthStateComponent.href}
                    className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'absolute right-4 top-4 md:right-8 md:top-8'
                    )}
                >
                    {renderAuthStateComponent.title}
                </Link>
                <Link
                    href={renderAuthStateComponent.href}
                    className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'absolute left-4 top-4 md:left-8 md:top-8'
                    )}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-6 w-6"
                    >
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                    <p className="text-black-400">Motalent</p>
                </Link>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
