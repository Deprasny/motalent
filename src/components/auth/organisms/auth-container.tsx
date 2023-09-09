import React from "react";
import TermAndConditions from "../molecules/terms-and-condition";
import { HeadingInformation } from "../molecules";

interface AuthContainerProps {
  FormComponent: React.ReactElement;
  title: string;
  description: string;
  withTermsAndCondition?: boolean;
}

const AuthContainer = ({
  FormComponent,
  title,
  description,
  withTermsAndCondition,
}: AuthContainerProps) => {
  return (
    <div className="flex flex-col gap-8">
      <HeadingInformation title={title} description={description} />
      {FormComponent}

      {withTermsAndCondition && <TermAndConditions />}
    </div>
  );
};

export default AuthContainer;
