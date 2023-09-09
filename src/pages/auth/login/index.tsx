import React from "react";

import { AuthLayout } from "@/components/layouts";
import AuthContainer from "@/components/auth/organisms/auth-container";
import { LoginForm } from "@/components/auth/molecules";

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

export default AuthLoginPage;
