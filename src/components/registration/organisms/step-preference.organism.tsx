import MotalentForm from '@/components/shared/molecules/motalent-form';
import MotalentFormItem from '@/components/shared/molecules/motalent-form-item';
import MotalentInput from '@/components/shared/molecules/motalent-input';
import MotalentSelect from '@/components/shared/molecules/motalent-select';
import { useStepperContext } from '@/components/shared/organisms/stepper.organism';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
    useQueryGetDistricts,
    useQueryGetProvinces,
    useQueryGetRegencies,
    useQueryGetVillages
} from '@/hooks/general';
import { InferZodSchema } from '@/interfaces/zod.interface';
import { useClientRegistrationFormWizard } from '@/stores/client-registration-form-wizard.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { ControllerRenderProps, useFormContext } from 'react-hook-form';
import * as z from 'zod';

// "category_ids": [
//     "string"
//   ],
//   "province_id": "string",
//   "regency_id": "string",
//   "district_id": "string",
//   "village_id": "string",
//   "min_price": 0,
//   "max_price": 0,
//   "min_age": 0,
//   "max_age": 0,
//   "is_negotiable": true,
//   "is_dp": true

const formSchema = z.object({
    category_ids: z.string().nonempty(),
    province_id: z.string().nonempty(),
    regency_id: z.string().nonempty(),
    village_id: z.string().nonempty(),
    district_id: z.string().nonempty(),
    min_price: z.number(),
    max_price: z.number(),
    min_age: z.number(),
    max_age: z.number(),
    is_negotiable: z.boolean(),
    is_dp: z.boolean()
});

const EXAMPLE = [
    {
        label: 'A',
        value: 'A'
    },
    {
        label: 'B',
        value: 'B'
    }
];

type TypeLocationChange =
    | 'province_id'
    | 'regency_id'
    | 'district_id'
    | 'village_id';

type FieldValues = InferZodSchema<typeof formSchema>;

export default function StepPreference() {
    const router = useRouter();
    const stepperContext = useStepperContext();

    const setIsValidPreference = useClientRegistrationFormWizard(
        (state) => state.setIsValidPreference
    );

    const setSearchPreferenceForm = useClientRegistrationFormWizard(
        (state) => state.setSearchPreferenceForm
    );

    const defaultPreferenceForm = useClientRegistrationFormWizard(
        (state) => state.preferenceState
    );

    function handleSubmit(data: FieldValues) {
        setSearchPreferenceForm(data);

        alert('Regsitration Complete');
    }
    return (
        <MotalentForm<FieldValues, object, FieldValues>
            onSubmit={(data) => {
                handleSubmit(data);
            }}
            resolver={zodResolver(formSchema)}
            defaultValues={defaultPreferenceForm}
            mode="onChange"
            reValidateMode="onChange"
            onInvalid={() => {
                setIsValidPreference(false);
            }}
            onValid={() => setIsValidPreference(true)}
        >
            {({ control, formState }) => (
                <div className="flex flex-col gap-4">
                    <LocationForms />
                    <div className="flex items-center justify-center gap-x-5">
                        <div className="w-full">
                            <FormField
                                control={control}
                                name="category_ids"
                                render={({ field }) => (
                                    <MotalentFormItem
                                        label="category"
                                        description="Please choose your category"
                                    >
                                        <MotalentSelect
                                            defaultValue={field.value}
                                            value={field.value}
                                            onValueChange={field.onChange}
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
                                name="min_price"
                                render={({ field }) => (
                                    <MotalentFormItem
                                        label="Min price"
                                        description="Please input min price"
                                    >
                                        <MotalentInput
                                            {...field}
                                            placeholder="Input"
                                            type="number"
                                            onChange={(val) => {
                                                field.onChange(
                                                    parseInt(
                                                        val.target.value ||
                                                            String(0)
                                                    )
                                                );
                                            }}
                                            min={1}
                                            required
                                        />
                                    </MotalentFormItem>
                                )}
                            />
                        </div>

                        <div className="w-full">
                            <FormField
                                control={control}
                                name="max_price"
                                render={({ field }) => (
                                    <MotalentFormItem
                                        label="max price"
                                        description="Please choose your max price"
                                    >
                                        <MotalentInput
                                            {...field}
                                            placeholder="Input"
                                            type="number"
                                            onChange={(val) => {
                                                field.onChange(
                                                    parseInt(
                                                        val.target.value ||
                                                            String(0)
                                                    )
                                                );
                                            }}
                                            min={1}
                                            required
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
                                name="min_age"
                                render={({ field }) => (
                                    <MotalentFormItem
                                        label="Min age"
                                        description="Please input min age"
                                    >
                                        <MotalentInput
                                            {...field}
                                            placeholder="Input"
                                            type="number"
                                            onChange={(val) => {
                                                field.onChange(
                                                    parseInt(
                                                        val.target.value ||
                                                            String(0)
                                                    )
                                                );
                                            }}
                                            min={1}
                                            required
                                        />
                                    </MotalentFormItem>
                                )}
                            />
                        </div>

                        <div className="w-full">
                            <FormField
                                control={control}
                                name="max_age"
                                render={({ field }) => (
                                    <MotalentFormItem
                                        label="max age"
                                        description="Please choose your max age"
                                    >
                                        <MotalentInput
                                            {...field}
                                            placeholder="Input"
                                            type="number"
                                            onChange={(val) => {
                                                field.onChange(
                                                    parseInt(
                                                        val.target.value ||
                                                            String(0)
                                                    )
                                                );
                                            }}
                                            min={1}
                                            required
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
                                name="is_negotiable"
                                render={({ field }) => (
                                    <div className="flex gap-2 items-center">
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={(value) => {
                                                field.onChange(value);
                                            }}
                                        />
                                        <Label>Negotiable ?</Label>
                                    </div>
                                )}
                            />
                        </div>

                        <div className="w-full">
                            <FormField
                                control={control}
                                name="is_dp"
                                render={({ field }) => (
                                    <div className="flex gap-2 items-center">
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={(value) => {
                                                field.onChange(value);
                                            }}
                                        />
                                        <Label>Is DP ?</Label>
                                    </div>
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
            )}
        </MotalentForm>
    );
}

function LocationForms() {
    const { control, getValues, setValue } = useFormContext<FieldValues>();

    const setSearchPreferenceForm = useClientRegistrationFormWizard(
        (state) => state.setSearchPreferenceForm
    );

    const { data: provinceOptions, isFetching: isLoadingProvinceOptions } =
        useQueryGetProvinces();

    const { data: regencyOptions, isFetching: isLoadingRegencyOptions } =
        useQueryGetRegencies(getValues('province_id'));

    const { data: districtOptions, isFetching: isLoadingDistrictOptions } =
        useQueryGetDistricts(getValues('regency_id'));

    const { data: villageOptions, isFetching: isLoadingVillageOptions } =
        useQueryGetVillages(getValues('district_id'));

    function handleLocationChange<T extends keyof FieldValues>(
        field: ControllerRenderProps<FieldValues, T>,
        type: TypeLocationChange
    ) {
        return function (value: string) {
            setSearchPreferenceForm({
                ...getValues(),
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
                                    defaultValue={field.value}
                                    value={field.value}
                                    isLoading={isLoadingProvinceOptions}
                                    onValueChange={handleLocationChange(
                                        field,
                                        'province_id'
                                    )}
                                    ref={field.ref}
                                    options={provinceOptions || []}
                                    placeholder="Select Province"
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
                                    onValueChange={handleLocationChange(
                                        field,
                                        'regency_id'
                                    )}
                                    ref={field.ref}
                                    isLoading={isLoadingRegencyOptions}
                                    options={regencyOptions}
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
                                    onValueChange={handleLocationChange(
                                        field,
                                        'district_id'
                                    )}
                                    ref={field.ref}
                                    isLoading={isLoadingDistrictOptions}
                                    options={districtOptions}
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
                                    onValueChange={handleLocationChange(
                                        field,
                                        'village_id'
                                    )}
                                    isLoading={isLoadingVillageOptions}
                                    options={villageOptions}
                                />
                            </MotalentFormItem>
                        )}
                    />
                </div>
            </div>
        </>
    );
}
