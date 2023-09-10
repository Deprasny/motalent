import React from 'react';

import { AuthLayout } from '@/components/layouts';
import { AuthContainer } from '@/components/auth/organisms';
import { RegisterForm } from '@/components/auth/molecules';

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

export default AuthRegisterPage;
