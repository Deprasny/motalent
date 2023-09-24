import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { UpdateClientRegistrationBody } from '@/interfaces/client.interface';

import { ClientService } from '@/services/client.service';

export function useUpdateRegistration() {
    const service = new ClientService();
    const router = useRouter();
    const { data: session, update } = useSession();

    async function updateSession() {
        await update({
            ...session,
            user: {
                ...(session?.user || {}),
                has_complete_registration: true
            }
        });
    }

    return useMutation({
        mutationFn: (data: UpdateClientRegistrationBody) =>
            service.updateRegistration(data),
        onSuccess: async () => {
            await updateSession();
            await router.replace('/protected');
        }
    });
}
