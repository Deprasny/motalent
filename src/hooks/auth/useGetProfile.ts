import { AuthService } from '@/services/auth.service';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export function useGetProfile(token?: string) {
    const authService = new AuthService();
    const { data: session, update } = useSession(); // IMPORT

    return useQuery({
        queryKey: ['profile'],
        queryFn: () => authService.getProfile(token || session?.accessToken),
        onSuccess: (data) => {
            update({
                ...session,
                user: {
                    ...session?.user,
                    ...data
                }
            });
        },
        enabled: !!token || !!session
    });
}
