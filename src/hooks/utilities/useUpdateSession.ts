import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';

type SessionUser = Partial<Session['user']>;
type SessionClient = Partial<Session['user']['client']>;

export function useUpdateSession() {
    const { data: session, update: updateSession } = useSession();

    const updateUser = useCallback(
        async (user?: SessionUser) =>
            await updateSession({
                ...session,
                user: {
                    ...session?.user,
                    ...user
                }
            }),
        [session, updateSession]
    );

    const updateClient = useCallback(
        async (client?: SessionClient) =>
            await updateSession({
                ...session,
                user: {
                    ...session?.user,
                    client: {
                        ...session?.user?.client,
                        ...client
                    }
                }
            }),
        [session, updateSession]
    );

    return {
        updateUser,
        updateClient
    };
}
