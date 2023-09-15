import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User;
        accessToken: string;
        token: JWT;
    }

    interface User {
        id: number;
        name: string;
        email: string;
        role: string;
        status: 'active' | 'inactive';
        is_active: boolean;
        accessToken: string;
        client: {
            id: number;
            name: string;
            bio: string;
            age: number;
            dob: string;
            address: string;
            gender: string;
            blood_type: number;
            province_id: string;
            regency_id: string;
            district_id: string;
            village_id: string;
            created_at: string;
            updated_at: string;
        };
    }
}
