import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { useUpdateSession } from '../utilities/useUpdateSession';

import { useToast } from '@/components/ui/use-toast';

import { UpdateAccountRequestBody } from '@/interfaces/auth.interface';

import { AuthService } from '@/services/auth.service';

export function useUpdateProfile() {
    const service = new AuthService();
    const { toast } = useToast();
    const router = useRouter();
    const { updateUser } = useUpdateSession();

    return useMutation({
        mutationFn: (data: UpdateAccountRequestBody) =>
            service.updateProfile(data),
        onSuccess: async (_, { email, name }) => {
            await router.replace('/profile');
            await updateUser({
                name,
                email
            });
            toast({
                title: 'Update profile success.',
                description: '',
                variant: 'default',
                duration: 5000
            });
        }
    });
}
