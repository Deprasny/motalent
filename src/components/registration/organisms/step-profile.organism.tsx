import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import MotalentForm from '@/components/shared/molecules/motalent-form';
import MotalentFormItem from '@/components/shared/molecules/motalent-form-item';
import MotalentInput from '@/components/shared/molecules/motalent-input';
import MotalentSelect from '@/components/shared/molecules/motalent-select';
import { FormField } from '@/components/ui/form';
import { SelectOptions } from '@/interfaces/global.interface';

import { InferZodSchema } from '@/interfaces/zod.interface';

import {
    ClientProfileFormState,
    useClientRegistrationFormWizard
} from '@/stores/client-registration-form-wizard.store';
import { useStepperContext } from '@/components/shared/organisms/stepper.organism';
import { Button } from '@/components/ui/button';
import MotalentCard from '@/components/shared/molecules/motalent-card';

const formSchema = z.object({
    name: z.string().nonempty(),
    address: z.string().nonempty(),
    age: z.string(),
    blood_type: z.string().nonempty(),
    dob: z.string().nonempty(),
    gender: z.string().nonempty()
});

type FieldValues = InferZodSchema<typeof formSchema>;

const BLOOD_TYPES: SelectOptions = [
    {
        label: 'A',
        value: 'a'
    },
    {
        label: 'B',
        value: 'b'
    },
    {
        label: 'AB',
        value: 'ab'
    },
    {
        label: 'O',
        value: 'o'
    }
];

const StepProfile = () => {
    const stepperContext = useStepperContext();

    const setIsValidProfile = useClientRegistrationFormWizard(
        (state) => state.setIsValidProfile
    );

    const setProfileForm = useClientRegistrationFormWizard(
        (state) => state.setProfileForm
    );

    const defaultProfileForm = useClientRegistrationFormWizard(
        (state) => state.profileState
    );

    function handleSubmit(data: FieldValues) {
        setProfileForm({
            ...data,
            dob: new Date(data.dob)
        });

        stepperContext?.handleNextStep();
    }

    return (
        <MotalentForm<FieldValues, object, FieldValues>
            onSubmit={(data) => {
                handleSubmit(data);
            }}
            resolver={zodResolver(formSchema)}
            defaultValues={{
                ...defaultProfileForm,
                dob: defaultProfileForm.dob?.toISOString().split('T')[0]
            }}
            mode="onChange"
            reValidateMode="onChange"
            onInvalid={() => {
                setIsValidProfile(false);
            }}
            onValid={() => setIsValidProfile(true)}
        >
            {({ control, formState }) => (
                <MotalentCard label="Profile" description="input your profile">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-center gap-x-5">
                            <div className="w-full">
                                <FormField
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <MotalentFormItem
                                            label="Name"
                                            description="Please input your name.."
                                        >
                                            <MotalentInput
                                                placeholder="Input your name"
                                                {...field}
                                            />
                                        </MotalentFormItem>
                                    )}
                                />
                            </div>
                            <div className="w-full">
                                <FormField
                                    control={control}
                                    name="address"
                                    render={({ field }) => (
                                        <MotalentFormItem
                                            label="Address"
                                            description="Please input your address"
                                        >
                                            <MotalentInput
                                                placeholder="Input your address"
                                                {...field}
                                            />
                                        </MotalentFormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-x-5">
                            <div className="w-full">
                                <FormField
                                    control={control}
                                    name="age"
                                    render={({ field }) => (
                                        <MotalentFormItem
                                            label="Age"
                                            description="Please input your age"
                                        >
                                            <MotalentInput
                                                placeholder="Input your age"
                                                type="number"
                                                required
                                                min={1}
                                                max={100}
                                                {...field}
                                            />
                                        </MotalentFormItem>
                                    )}
                                />
                            </div>

                            <div className="w-full">
                                <FormField
                                    control={control}
                                    name="blood_type"
                                    render={({ field }) => (
                                        <MotalentFormItem
                                            label="Blood Type"
                                            description="Please choose your blood type"
                                        >
                                            <MotalentSelect
                                                value={field.value || undefined}
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                }}
                                                ref={field.ref}
                                                options={BLOOD_TYPES}
                                                height="h-auto"
                                            />
                                        </MotalentFormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-x-5">
                            <div className="w-full">
                                <FormField
                                    control={control}
                                    name="dob"
                                    render={({ field }) => (
                                        <MotalentFormItem
                                            label="Date of Birth"
                                            description="Please choose your date of birth"
                                        >
                                            <MotalentInput
                                                {...field}
                                                onChange={(value) => {
                                                    field.onChange(value);
                                                }}
                                                value={
                                                    field.value
                                                        ? field.value.toString()
                                                        : ''
                                                }
                                                type="date"
                                            />
                                        </MotalentFormItem>
                                    )}
                                />
                            </div>

                            <div className="w-full">
                                <FormField
                                    control={control}
                                    name="gender"
                                    defaultValue="male"
                                    render={({ field }) => (
                                        <MotalentFormItem
                                            label="Gender"
                                            description="Please choose your gender"
                                        >
                                            <MotalentSelect
                                                {...field}
                                                value={field.value || undefined}
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                }}
                                                options={[
                                                    {
                                                        label: 'Female',
                                                        value: 'female'
                                                    },
                                                    {
                                                        label: 'Male',
                                                        value: 'male'
                                                    }
                                                ]}
                                                height="h-auto"
                                            />
                                        </MotalentFormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex w-full justify-end self-end gap-3">
                            <Button disabled={stepperContext?.isFirstStep}>
                                Prev
                            </Button>

                            <Button disabled={!formState.isValid} type="submit">
                                Next
                            </Button>
                        </div>
                    </div>
                </MotalentCard>
            )}
        </MotalentForm>
    );
};

export default StepProfile;
