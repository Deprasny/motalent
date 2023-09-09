import React from "react";

import { AuthLayout } from "@/components/layouts";
import { AuthContainer } from "@/components/auth/organisms";

const AuthRegisterPage = () => {
  return (
    <AuthLayout type="register">
      <AuthContainer
        title="Create your Account"
        description="Enter your email and password below to create your account"
        FormComponent={<p>hahah</p>}
        withTermsAndCondition
      />
    </AuthLayout>
  );
};

export default AuthRegisterPage;
