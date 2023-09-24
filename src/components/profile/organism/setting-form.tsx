import { zodResolver } from '@hookform/resolvers/zod';
import { Session } from 'next-auth';
import { ControllerRenderProps, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import MotalentForm from '@/components/shared/molecules/motalent-form';
import MotalentFormItem from '@/components/shared/molecules/motalent-form-item';
import MotalentInput from '@/components/shared/molecules/motalent-input';
import MotalentSelect from '@/components/shared/molecules/motalent-select';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form';

import { useUpdateClient } from '@/hooks/client/useUpdateClient';
import {
    useQueryGetDistricts,
    useQueryGetProvinces,
    useQueryGetRegencies,
    useQueryGetVillages
} from '@/hooks/general';

import { SelectOptions } from '@/interfaces/global.interface';
import { InferZodSchema } from '@/interfaces/zod.interface';

import { transformObject } from '@/lib/utils';

const formSchema = z.object({
    name: z.string().nonempty(),
    bio: z.string().nonempty(),
    dob: z.string().nonempty(),
    address: z.string().nonempty(),
    gender: z.string().nonempty(),
    blood_type: z.string().nonempty(),
    province_id: z.string().nonempty(),
    regency_id: z.string().nonempty(),
    district_id: z.string().nonempty(),
    village_id: z.string().nonempty()
});

const BLOOD_TYPES: SelectOptions = [
    {
        label: 'A',
        value: 'A'
    },
    {
        label: 'B',
        value: 'B'
    },
    {
        label: 'AB',
        value: 'AB'
    },
    {
        label: 'O',
        value: 'O'
    }
];

type ClientValues = InferZodSchema<typeof formSchema>;

interface Props {
    session: Session;
}

type TypeLocationChange =
    | 'province_id'
    | 'regency_id'
    | 'district_id'
    | 'village_id';

const SettingForm = (session: Props) => {
    console.log(session);
    const {
        name,
        bio,
        dob,
        address,
        gender,
        blood_type,
        province_id,
        regency_id,
        district_id,
        village_id
    } = session.session.user.client;
    const { mutateAsync } = useUpdateClient();

    const handleSubmit = async (data: ClientValues) => {
        mutateAsync(data);
    };

    return (
        <MotalentForm<ClientValues, object, ClientValues>
            onSubmit={async (data) => await handleSubmit(data)}
            resolver={zodResolver(formSchema)}
            defaultValues={transformObject({
                name,
                bio,
                dob,
                address,
                gender,
                blood_type,
                province_id,
                regency_id,
                district_id,
                village_id
            })}
            mode="onChange"
        >
            {({ control, formState }) => (
                <>
                    <div className="flex flex-col gap-4">
                        <FormField
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <MotalentFormItem
                                    label="Name"
                                    description="change your name"
                                >
                                    <MotalentInput
                                        placeholder="Please enter your email here.."
                                        {...field}
                                    />
                                </MotalentFormItem>
                            )}
                        />

                        <FormField
                            name="bio"
                            control={control}
                            render={({ field }) => (
                                <MotalentFormItem
                                    label="bio"
                                    description="change your bio"
                                >
                                    <MotalentInput placeholder="" {...field} />
                                </MotalentFormItem>
                            )}
                        />

                        <FormField
                            name="dob"
                            control={control}
                            render={({ field }) => (
                                <MotalentFormItem
                                    label="dob"
                                    description="change your dob"
                                >
                                    <MotalentInput
                                        type="date"
                                        placeholder=""
                                        {...field}
                                    />
                                </MotalentFormItem>
                            )}
                        />

                        <FormField
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <MotalentFormItem
                                    label="address"
                                    description="change your adress"
                                >
                                    <MotalentInput placeholder="" {...field} />
                                </MotalentFormItem>
                            )}
                        />

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

                        <LocationForms />
                    </div>
                    <div className="flex items-end justify-end mt-5">
                        <Button
                            loadingText="Signin..."
                            isLoading={formState.isSubmitting}
                            type="submit"
                        >
                            Save
                        </Button>
                    </div>
                </>
            )}
        </MotalentForm>
    );
};

function LocationForms() {
    const { control, watch, setValue } = useFormContext<ClientValues>();

    const { data: provinceOptions, isFetching: isLoadingProvinceOptions } =
        useQueryGetProvinces();

    const { data: regencyOptions, isFetching: isLoadingRegencyOptions } =
        useQueryGetRegencies(watch('province_id'));

    const { data: districtOptions, isFetching: isLoadingDistrictOptions } =
        useQueryGetDistricts(watch('regency_id'));

    const { data: villageOptions, isFetching: isLoadingVillageOptions } =
        useQueryGetVillages(watch('district_id'));

    function handleLocationChange<T extends keyof ClientValues>(
        field: ControllerRenderProps<ClientValues, T>,
        type: TypeLocationChange
    ) {
        return function (value: string) {
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

export default SettingForm;
