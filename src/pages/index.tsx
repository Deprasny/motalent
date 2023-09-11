import StepLocation from "@/components/registration/organisms/step-location.organism";
import StepPreference from "@/components/registration/organisms/step-preference.organism";
import StepProfile from "@/components/registration/organisms/step-profile.organism";

import Stepper, {
	StepperStep,
} from "@/components/shared/organisms/stepper.organism";
import { useClientRegistrationFormWizard } from "@/stores/client-registration-form-wizard.store";

const STEPS: StepperStep[] = [
	{
		label: "Profile",
		isCustomStepActionButtons: false,
		content: () => <StepProfile />,
	},
	{
		label: "Location & Area",
		isCustomStepActionButtons: false,
		content: () => <StepLocation />,
	},
	{
		label: "Payment",
		isCustomStepActionButtons: false,
		content: () => <StepPreference />,
	},
];

export default function Home() {
	const blocksIn = useClientRegistrationFormWizard((state) => [
		!state.isValidProfile,
		!state.isValidLocation,
		!state.isValidPreference,
	]);

	return (
		<div className="flex flex-col max-w-lg mx-auto my-8">
			<Stepper
				defaultStep={0}
				steps={STEPS}
				blocksIn={blocksIn}
				onFinish={() => {
					alert("SUBMIT");
				}}
			/>
		</div>
	);
}
