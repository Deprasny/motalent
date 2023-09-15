import NextAuth, { AuthOptions } from 'next-auth';
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
            authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                if (email === 'jsmith@mail.com' && password === 'password') {
                    // Any object returned will be saved in `user` property of the JWT
                    return Promise.resolve({
                        id: '1',
                        email: 'jsmith@mail.com',
                        image: 'https://avatars.githubusercontent.com/u/13997136?v=4',
                        name: 'John Smith'
                    });
                } else {
                    // If you return null or false then the credentials will be rejected
                    return Promise.reject(
                        new Error('Invalid username or password')
                    ); // Redirect to error page
                    // You can also Reject this callback with an Error or with a URL:
                    // return Promise.reject(new Error('error message')) // Redirect to error page
                    // return Promise.reject('/path/to/redirect')        // Redirect to a URL
                }
            }
        })
        // ...add more providers here
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/login',
        error: '/auth/login' // Error code passed in query string as ?error=,
    }
};

export default NextAuth(authOptions);
