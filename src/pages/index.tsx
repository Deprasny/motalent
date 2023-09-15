import StepLocation from '@/components/registration/organisms/step-location.organism';
import StepPreference from '@/components/registration/organisms/step-preference.organism';
import StepProfile from '@/components/registration/organisms/step-profile.organism';

import Stepper, {
    StepperStep
} from '@/components/shared/organisms/stepper.organism';
import { useClientRegistrationFormWizard } from '@/stores/client-registration-form-wizard.store';
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
                isEligibleNextStep: isValidProfile,
                content: () => <StepProfile />
            },
            {
                label: 'Location',
                isCustomStepActionButtons: true,
                isEligibleNextStep: isValidLocation,
                content: () => <StepLocation />
            },
            {
                label: 'Search Preferences',
                isCustomStepActionButtons: true,
                isEligibleNextStep: isValidPreference,
                content: () => <StepPreference />
            }
        ],
        [isValidLocation, isValidPreference, isValidProfile]
    );
    return (
        <div className="flex flex-col w-[800px] mx-auto my-8">
            <Stepper defaultStep={0} steps={steps} />
        </div>
    );
}
