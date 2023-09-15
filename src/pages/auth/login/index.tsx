import { GetServerSideProps } from 'next';

import { LoginForm } from '@/components/auth/molecules';
import AuthContainer from '@/components/auth/organisms/auth-container';
import { AuthLayout } from '@/components/layouts';

import { getAuthServerSession } from '@/lib/get-auth-server-session';

const AuthLoginPage = () => {
    return (
        <AuthLayout type="login">
            <AuthContainer
                title="Sign in to your account"
                description="Enter your email and password below to access your dashboard"
                FormComponent={<LoginForm />}
            />
        </AuthLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getAuthServerSession(context);

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }

    return {
        props: {}
    };
};

export default AuthLoginPage;
