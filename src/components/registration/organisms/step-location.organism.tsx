import { useStepperContext } from '@/components/shared/organisms/stepper.organism';
import { Button } from '@/components/ui/button';

export default function StepLocation() {
    const stepperContext = useStepperContext();

    return (
        <div>
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
    );
}
