import { useStepperContext } from '@/components/shared/organisms/stepper.organism';
import { Button } from '@/components/ui/button';

export default function StepPreference() {
    const stepperContext = useStepperContext();
    return (
        <div>
            <div className="flex w-full justify-end self-end gap-3">
                <Button onClick={() => stepperContext?.handlePrevStep()}>
                    Prev
                </Button>

                <Button
                    onClick={() => stepperContext?.handleNextStep()}
                    type="submit"
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
