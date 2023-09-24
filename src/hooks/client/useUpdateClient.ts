import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { useUpdateSession } from '../utilities/useUpdateSession';

import { UpdateClientRequestBody } from '@/interfaces/client.interface';

import { ClientService } from '@/services/client.service';

export function useUpdateClient() {
    const service = new ClientService();
    const router = useRouter();
    const { data: session, update } = useSession();
    const { id } = session?.user?.client || {};

    const { updateClient } = useUpdateSession();

    return useMutation({
        mutationFn: (data: UpdateClientRequestBody) =>
            service.updateClient(data, id?.toString()),
        onSuccess: async (data) => {
            console.log(data);
            // await updateClient();
            // await router.reload();
        }
    });
}
