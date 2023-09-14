import * as z from 'zod';

import { useStepperContext } from '@/components/shared/organisms/stepper.organism';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import MotalentForm from '@/components/shared/molecules/motalent-form';
import MotalentFormItem from '@/components/shared/molecules/motalent-form-item';
import MotalentSelect from '@/components/shared/molecules/motalent-select';
import { InferZodSchema } from '@/interfaces/zod.interface';
import { useClientRegistrationFormWizard } from '@/stores/client-registration-form-wizard.store';
import { FormField } from '@/components/ui/form';
import { SelectOptions } from '@/interfaces/global.interface';

type FieldValues = InferZodSchema<typeof formSchema>;

const EXAMPLE: SelectOptions = [
    {
        label: 'example 1',
        value: '1'
    },
    {
        label: 'example 2',
        value: '2'
    },
    {
        label: 'example 3',
        value: '3'
    },
    {
        label: 'example 4',
        value: '4'
    }
];

const formSchema = z.object({
    province_id: z.string().nonempty(),
    regency_id: z.string().nonempty(),
    district_id: z.string().nonempty(),
    village_id: z.string().nonempty()
});

export default function StepLocation() {
    const stepperContext = useStepperContext();

    const setIsValidLocation = useClientRegistrationFormWizard(
        (state) => state.setIsValidLocation
    );

    const setLocationForm = useClientRegistrationFormWizard(
        (state) => state.setLocationForm
    );

    const defaultLocationForm = useClientRegistrationFormWizard(
        (state) => state.locationState
    );

    function handleSubmit(data: FieldValues) {
        setLocationForm(data);
        stepperContext?.handleNextStep();
    }

    return (
        <MotalentForm<FieldValues, object, FieldValues>
            onSubmit={(data) => {
                handleSubmit(data);
            }}
            resolver={zodResolver(formSchema)}
            defaultValues={defaultLocationForm}
            mode="onChange"
            reValidateMode="onChange"
            onInvalid={() => {
                setIsValidLocation(false);
            }}
            onValid={() => setIsValidLocation(true)}
        >
            {({ control, formState }) => (
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-center gap-x-5">
                        <div className="w-full">
                            <FormField
                                control={control}
                                name="province_id"
                                render={({ field }) => (
                                    <MotalentFormItem
                                        label="Province"
                                        description="Please choose your province"
                                    >
                                        <MotalentSelect
                                            defaultValue={field.value}
                                            value={field.value}
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                            }}
                                            ref={field.ref}
                                            options={EXAMPLE}
                                        />
                                    </MotalentFormItem>
                                )}
                            />
                        </div>

                        <div className="w-full">
                            <FormField
                                control={control}
                                name="regency_id"
                                render={({ field }) => (
                                    <MotalentFormItem
                                        label="Regency"
                                        description="Please choose your regency"
                                    >
                                        <MotalentSelect
                                            defaultValue={field.value}
                                            value={field.value}
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                            }}
                                            ref={field.ref}
                                            options={EXAMPLE}
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
                                name="district_id"
                                render={({ field }) => (
                                    <MotalentFormItem
                                        label="District"
                                        description="Please choose your district"
                                    >
                                        <MotalentSelect
                                            defaultValue={field.value}
                                            value={field.value}
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                            }}
                                            ref={field.ref}
                                            options={EXAMPLE}
                                        />
                                    </MotalentFormItem>
                                )}
                            />
                        </div>

                        <div className="w-full">
                            <FormField
                                control={control}
                                name="village_id"
                                render={({ field }) => (
                                    <MotalentFormItem
                                        label="Village"
                                        description="Please choose your village"
                                    >
                                        <MotalentSelect
                                            defaultValue={field.value}
                                            value={field.value}
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                            }}
                                            ref={field.ref}
                                            options={EXAMPLE}
                                        />
                                    </MotalentFormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex w-full justify-end self-end gap-3">
                        <Button
                            type="button"
                            onClick={() => stepperContext?.handlePrevStep()}
                        >
                            Prev
                        </Button>

                        <Button disabled={!formState.isValid} type="submit">
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </MotalentForm>
    );
}
