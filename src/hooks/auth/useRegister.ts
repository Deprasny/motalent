import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import { useToast } from '@/components/ui/use-toast';

import { SignUpRequestBody } from '@/interfaces/auth.interface';
import { BaseResponse } from '@/interfaces/global.interface';

import { AuthService } from '@/services/auth.service';

export function useRegister() {
    const autservice = new AuthService();

    const router = useRouter();
    const { toast } = useToast();

    return useMutation<string, string, SignUpRequestBody>({
        mutationFn: (payload) => autservice.register(payload),
        onSuccess: async (__, variables) => {
            const { email, password } = variables || {};
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false
            });

            const callbackUrl = router.query.callbackUrl as string;

            if (res?.ok) {
                router.replace(callbackUrl || '/');
                toast({
                    title: 'Successfully Registration'
                });
            } else {
                toast({
                    title: 'Ooops! Something went wrong.',
                    description: res?.error as string,
                    variant: 'destructive',
                    duration: 5000
                });
            }
        },
        onError(errorMessage) {
            toast({
                title: 'Ooop something went wrong.',
                description: errorMessage,
                variant: 'destructive'
            });
        }
    });
}
