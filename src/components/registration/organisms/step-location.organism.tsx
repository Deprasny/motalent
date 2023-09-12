import { Button } from '@/components/ui/button';
import { useClientRegistrationFormWizard } from '@/stores/client-registration-form-wizard.store';
import React from 'react';

export default function StepLocation() {
    const setIsValidLocation = useClientRegistrationFormWizard(
        (state) => state.setIsValidLocation
    );
    const setIsValidPreference = useClientRegistrationFormWizard(
        (state) => state.setIsValidPreference
    );

    return (
        <div>
            <Button
                onClick={() => {
                    setIsValidLocation(true);
                }}
            >
                Validate Me
            </Button>
        </div>
    );
}
