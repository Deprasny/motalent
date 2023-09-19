import * as z from 'zod';

import { useStepperContext } from '@/components/shared/organisms/motalent-stepper.organism';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import MotalentForm from '@/components/shared/molecules/motalent-form';
import MotalentFormItem from '@/components/shared/molecules/motalent-form-item';
import MotalentSelect from '@/components/shared/molecules/motalent-select';
import { InferZodSchema } from '@/interfaces/zod.interface';
import { useClientRegistrationFormWizard } from '@/stores/client-registration-form-wizard.store';
import { FormField } from '@/components/ui/form';
import {
    useQueryGetDistricts,
    useQueryGetProvinces,
    useQueryGetRegencies,
    useQueryGetVillages
} from '@/hooks/general';
import { ControllerRenderProps, useFormContext } from 'react-hook-form';
import { MapIcon, PinIcon } from 'lucide-react';
import MotalentCard from '@/components/shared/molecules/motalent-card';

type FieldValues = InferZodSchema<typeof formSchema>;

type TypeLocationChange =
    | 'province_id'
    | 'regency_id'
    | 'district_id'
    | 'village_id';

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
        <MotalentCard label="Profile" description="input your profile">
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
                {({ formState }) => (
                    <div className="flex flex-col gap-4">
                        <LocationForms />

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
        </MotalentCard>
    );
}

function LocationForms() {
    const { control, watch, setValue } = useFormContext<FieldValues>();

    const setLocationForm = useClientRegistrationFormWizard(
        (state) => state.setLocationForm
    );

    const { data: provinceOptions, isFetching: isLoadingProvinceOptions } =
        useQueryGetProvinces();

    const { data: regencyOptions, isFetching: isLoadingRegencyOptions } =
        useQueryGetRegencies(watch('province_id'));

    const { data: districtOptions, isFetching: isLoadingDistrictOptions } =
        useQueryGetDistricts(watch('regency_id'));

    const { data: villageOptions, isFetching: isLoadingVillageOptions } =
        useQueryGetVillages(watch('district_id'));

    function handleLocationChange<T extends keyof FieldValues>(
        field: ControllerRenderProps<FieldValues, T>,
        type: TypeLocationChange
    ) {
        return function (value: string) {
            setLocationForm({
                ...watch(),
                [type]: value
            });

            field.onChange(value);

            if (type === 'province_id') {
                setValue('regency_id', '');
                setValue('district_id', '');
                setValue('village_id', '');
            }

            if (type === 'regency_id') {
                setValue('district_id', '');
                setValue('village_id', '');
            }

            if (type === 'district_id') {
                setValue('village_id', '');
            }
        };
    }

    return (
        <>
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
                                    value={field.value || undefined}
                                    isLoading={isLoadingProvinceOptions}
                                    onValueChange={handleLocationChange(
                                        field,
                                        'province_id'
                                    )}
                                    ref={field.ref}
                                    options={provinceOptions || []}
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
                                    value={field.value || undefined}
                                    onValueChange={handleLocationChange(
                                        field,
                                        'regency_id'
                                    )}
                                    ref={field.ref}
                                    isLoading={isLoadingRegencyOptions}
                                    options={regencyOptions}
                                    disabled={!!!watch('province_id')}
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
                                    value={field.value || undefined}
                                    onValueChange={handleLocationChange(
                                        field,
                                        'district_id'
                                    )}
                                    ref={field.ref}
                                    isLoading={isLoadingDistrictOptions}
                                    options={districtOptions}
                                    disabled={!!!watch('regency_id')}
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
                                    value={field.value || undefined}
                                    onValueChange={handleLocationChange(
                                        field,
                                        'village_id'
                                    )}
                                    isLoading={isLoadingVillageOptions}
                                    options={villageOptions}
                                    disabled={!!!watch('district_id')}
                                />
                            </MotalentFormItem>
                        )}
                    />
                </div>
            </div>
        </>
    );
}
