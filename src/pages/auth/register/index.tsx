import { GetServerSideProps } from 'next';

import { RegisterForm } from '@/components/auth/molecules';
import { AuthContainer } from '@/components/auth/organisms';
import { AuthLayout } from '@/components/layouts';

import { getAuthServerSession } from '@/lib/get-auth-server-session';

const AuthRegisterPage = () => {
    return (
        <AuthLayout type="register">
            <AuthContainer
                title="Create your Account"
                description="Enter your email and password below to create your account"
                FormComponent={<RegisterForm />}
                withTermsAndCondition
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

export default AuthRegisterPage;
