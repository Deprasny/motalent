import { AuthService } from '@/services/auth.service';
import NextAuth, { AuthOptions, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
        Credentials({
            credentials: {
                email: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'jsmith'
                },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                try {
                    const authService = new AuthService();

                    const token = await authService.login(email, password);
                    const profile = await authService.getProfile(token);

                    const updatedProfile = profile;
                    updatedProfile.accessToken = token;

                    return Promise.resolve(updatedProfile);
                } catch (error: any) {
                    if (error.response) {
                        return Promise.reject(
                            new Error(
                                error.response.data.message ||
                                    'Something went wrong'
                            )
                        );
                    }

                    return Promise.reject(new Error('Something went wrong'));
                }
            }
        })
        // ...add more providers here
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/login',
        error: '/auth/login' // Error code passed in query string as ?error=,
    },
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        // Assigning encoded token from API to token created in the session
        async jwt({ user: response, token, account, session, trigger }) {
            if (trigger === 'update' && session) {
                token.accessToken = session.accessToken;
                token.user = session.user;
            }

            if (account && response) {
                token.accessToken = response.accessToken;
                token.user = response;
            }

            return token;
        },

        // Extending session object
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            session.user = token.user as User;

            return session;
        }
    }
};

export default NextAuth(authOptions);
