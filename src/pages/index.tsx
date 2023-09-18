import Navbar from '@/components/layouts/navbar.layout';
import StepLocation from '@/components/registration/organisms/step-location.organism';
import StepPreference from '@/components/registration/organisms/step-preference.organism';
import StepProfile from '@/components/registration/organisms/step-profile.organism';

import Stepper, {
    StepperStep
} from '@/components/shared/organisms/motalent-stepper.organism';
import { getAuthServerSession } from '@/lib/get-auth-server-session';
import { useClientRegistrationFormWizard } from '@/stores/client-registration-form-wizard.store';
import { GetServerSideProps } from 'next';
import { useMemo } from 'react';

export default function Home() {
    const { isValidLocation, isValidPreference, isValidProfile } =
        useClientRegistrationFormWizard((state) => ({
            isValidProfile: state.isValidProfile,
            isValidLocation: state.isValidLocation,
            isValidPreference: state.isValidPreference
        }));

    const steps = useMemo<StepperStep[]>(
        () => [
            {
                label: 'Profile',
                isCustomStepActionButtons: true,
                content: () => <StepProfile />
            },
            {
                label: 'Location',
                isCustomStepActionButtons: true,
                content: () => <StepLocation />
            },
            {
                label: 'Search Preferences',
                isCustomStepActionButtons: true,
                content: () => <StepPreference />
            }
        ],
        []
    );
    return (
        <Navbar>
            <div className="flex flex-col w-[1180px] mx-auto">
                <Stepper defaultStep={0} steps={steps} />
            </div>
        </Navbar>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getAuthServerSession(context);

    if (session && session.user.has_complete_registration) {
        return {
            redirect: {
                destination: '/protected',
                permanent: false
            }
        };
    }

    return {
        props: {}
    };
};
