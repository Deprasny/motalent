import MotalentCard from '@/components/shared/molecules/motalent-card';
import MotalentCoolSelect, {
    getMultiValues,
    onMultiChange
} from '@/components/shared/molecules/motalent-cool-select';
import MotalentForm from '@/components/shared/molecules/motalent-form';
import MotalentFormItem from '@/components/shared/molecules/motalent-form-item';
import MotalentInput from '@/components/shared/molecules/motalent-input';
import MotalentSelect from '@/components/shared/molecules/motalent-select';
import { useStepperContext } from '@/components/shared/organisms/motalent-stepper.organism';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible';
import { FormField } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useUpdateRegistration } from '@/hooks/client/useUpdateRegistration';
import {
    useGetCategories,
    useQueryGetDistricts,
    useQueryGetProvinces,
    useQueryGetRegencies,
    useQueryGetVillages
} from '@/hooks/general';
import { SelectOption } from '@/interfaces/global.interface';
import { InferZodSchema } from '@/interfaces/zod.interface';
import { toInt } from '@/lib/utils';
import {
    INITIAL_PREF_STATE,
    useClientRegistrationFormWizard
} from '@/stores/client-registration-form-wizard.store';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    ChevronsDownUp,
    ChevronsUpDown,
    PlusIcon,
    Search,
    SearchIcon,
    Trash2
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { HTMLAttributes, useState } from 'react';
import {
    ControllerRenderProps,
    FieldPath,
    UseFieldArrayReturn,
    useFieldArray,
    useFormContext
} from 'react-hook-form';
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

const preferenceSchema = z.object({
    category_ids: z.array(z.string()).min(1, {
        message: 'Category is required. Please choose at least one category'
    }),
    province_id: z.string().nonempty({
        message: 'Province is required'
    }),
    regency_id: z.string().nonempty({
        message: 'Regency is required'
    }),
    village_id: z.string().nonempty({
        message: 'Village is required'
    }),
    district_id: z.string().nonempty({
        message: 'District is required'
    }),
    min_price: z.number().nonnegative().min(1, {
        message: 'Min price must be greater than 0'
    }),
    max_price: z.number().nonnegative().min(1, {
        message: 'Max price must be greater than 0'
    }),
    min_age: z.number().nonnegative().min(1, {
        message: 'Min age must be greater than 0'
    }),
    max_age: z.number().nonnegative().min(1, {
        message: 'Max age must be greater than 0'
    }),
    is_negotiable: z.boolean(),
    is_dp: z.boolean()
});

const formSchema = z.object({
    preferences: z.array(preferenceSchema)
});

type TypeLocationChange =
    | 'province_id'
    | 'regency_id'
    | 'district_id'
    | 'village_id';

type PreferenceFieldValues = InferZodSchema<typeof preferenceSchema>;
type FormFieldSchema = InferZodSchema<typeof formSchema>;

function getPreferenceKeyName(
    number: number,
    field: keyof PreferenceFieldValues
): FieldPath<FormFieldSchema> {
    return `preferences.${number}.${field}` as const;
}

export default function StepPreference() {
    const stepperContext = useStepperContext();
    const { data: session } = useSession(); // import

    const { mutateAsync, isLoading } = useUpdateRegistration();

    const setIsValidPreference = useClientRegistrationFormWizard(
        (state) => state.setIsValidPreference
    );

    const setPushPreferencesForm = useClientRegistrationFormWizard(
        (state) => state.setPushPreferencesForm
    );
    const setRemovePreferencesForm = useClientRegistrationFormWizard(
        (state) => state.setRemovePreferencesForm
    );

    const defaultPreferenceForm = useClientRegistrationFormWizard(
        (state) => state.preferencesState
    );

    const setPreferencesForm = useClientRegistrationFormWizard(
        (state) => state.setPreferencesForm
    );

    const formState = useClientRegistrationFormWizard((state) => state);

    const { data: categoryOptions, isLoading: isLoadingGetCategoryOptions } =
        useGetCategories();

    async function handleSubmit(data: FormFieldSchema) {
        setIsValidPreference(true);

        await mutateAsync({
            client_id: session?.user?.client?.id || 0,
            location: formState.locationState,
            profile: {
                ...formState.profileState,
                name: formState.profileState.name || session?.user?.name || '',
                address: formState.profileState.address || '',
                age: parseInt(formState.profileState.age || '0') || 0,
                blood_type: formState.profileState.blood_type || '',
                dob:
                    formState.profileState.dob?.toISOString() ||
                    new Date().toISOString(),
                gender:
                    formState.profileState?.gender === 'male'
                        ? 'male'
                        : 'female'
            },
            search_preferences: data.preferences.map((pref) => ({
                category_ids: pref.category_ids || [],
                province_id: pref.province_id,
                regency_id: pref.regency_id,
                district_id: pref.district_id,
                village_id: pref.village_id,
                min_price: parseInt(pref.min_price.toString()),
                max_price: parseInt(pref.max_price.toString()),
                min_age: parseInt(pref.min_age.toString()),
                max_age: parseInt(pref.max_age.toString()),
                is_negotiable: pref.is_negotiable,
                is_dp: pref.is_dp
            }))
        });
    }
    return (
        <MotalentForm<FormFieldSchema, object, FormFieldSchema>
            onSubmit={(data) => {
                handleSubmit(data);
            }}
            resolver={zodResolver(formSchema)}
            defaultValues={{
                preferences: defaultPreferenceForm
            }}
            onInvalid={() => {
                setIsValidPreference(false);
            }}
            onValid={() => setIsValidPreference(true)}
            reValidateMode="onChange"
            mode="onChange"
        >
            {({ control, getValues, formState }) => (
                <PreferenceArrayForms>
                    {({ fields, append, remove }) => {
                        function onAddMore() {
                            append(INITIAL_PREF_STATE);
                            setPushPreferencesForm(INITIAL_PREF_STATE);
                        }

                        function onRemovePreference(index: number) {
                            remove(index);
                            setRemovePreferencesForm(index);
                        }

                        return (
                            <MotalentCard
                                label="Preference"
                                description="input your preference"
                            >
                                <Separator />

                                <div className="flex flex-col gap-8 mt-5">
                                    {fields.map(({ id }, index) => (
                                        <PreferenceCollapsible
                                            key={`${index}-${id}`}
                                            currentIndex={index}
                                            onRemovePreference={
                                                onRemovePreference
                                            }
                                            fieldsLength={fields.length}
                                        >
                                            <LocationForms
                                                key={`${index}-${id}`}
                                                currentIndex={index}
                                            />

                                            <div className="flex items-center justify-center gap-x-5">
                                                <div className="w-full">
                                                    <FormField
                                                        control={control}
                                                        name={
                                                            getPreferenceKeyName(
                                                                index,
                                                                'category_ids'
                                                            ) as 'preferences.0.category_ids'
                                                        }
                                                        render={({ field }) => {
                                                            const value =
                                                                getMultiValues(
                                                                    categoryOptions,
                                                                    field.value,
                                                                    (option) =>
                                                                        option.value
                                                                );

                                                            return (
                                                                <MotalentFormItem
                                                                    label="Category"
                                                                    description="Please choose your category"
                                                                >
                                                                    <MotalentCoolSelect<
                                                                        SelectOption,
                                                                        true
                                                                    >
                                                                        options={
                                                                            categoryOptions ||
                                                                            []
                                                                        }
                                                                        value={
                                                                            value
                                                                        }
                                                                        onChange={(
                                                                            newValues
                                                                        ) => {
                                                                            onMultiChange(
                                                                                newValues,
                                                                                field.onChange,
                                                                                (
                                                                                    option
                                                                                ) =>
                                                                                    option.value
                                                                            );
                                                                        }}
                                                                        isMulti
                                                                        closeMenuOnSelect={
                                                                            false
                                                                        }
                                                                        hideSelectedOptions={
                                                                            false
                                                                        }
                                                                        isClearable
                                                                        placeholder="Select Category"
                                                                        isLoading={
                                                                            isLoadingGetCategoryOptions
                                                                        }
                                                                    />
                                                                </MotalentFormItem>
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-center gap-x-5">
                                                <div className="w-full">
                                                    <FormField
                                                        control={control}
                                                        name={
                                                            getPreferenceKeyName(
                                                                index,
                                                                'min_price'
                                                            ) as 'preferences.0.min_price'
                                                        }
                                                        render={({
                                                            field,
                                                            fieldState
                                                        }) => (
                                                            <MotalentFormItem
                                                                label="Min price"
                                                                description="Please input min price"
                                                                message={
                                                                    fieldState
                                                                        .error
                                                                        ?.message
                                                                }
                                                            >
                                                                <MotalentInput
                                                                    {...field}
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    placeholder="Input"
                                                                    type="number"
                                                                    onChange={({
                                                                        target
                                                                    }) => {
                                                                        field.onChange(
                                                                            toInt(
                                                                                target.value
                                                                            )
                                                                        );
                                                                    }}
                                                                    isError={
                                                                        !!fieldState
                                                                            .error
                                                                            ?.message
                                                                    }
                                                                />
                                                            </MotalentFormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className="w-full">
                                                    <FormField
                                                        control={control}
                                                        name={
                                                            getPreferenceKeyName(
                                                                index,
                                                                'max_price'
                                                            ) as 'preferences.0.max_price'
                                                        }
                                                        render={({ field }) => (
                                                            <MotalentFormItem
                                                                label="Max Price"
                                                                description="Please choose your max price"
                                                            >
                                                                <MotalentInput
                                                                    {...field}
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    placeholder="Input"
                                                                    type="number"
                                                                    onChange={({
                                                                        target
                                                                    }) => {
                                                                        field.onChange(
                                                                            toInt(
                                                                                target.value
                                                                            )
                                                                        );
                                                                    }}
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
                                                        name={
                                                            getPreferenceKeyName(
                                                                index,
                                                                'min_age'
                                                            ) as 'preferences.0.min_age'
                                                        }
                                                        render={({ field }) => (
                                                            <MotalentFormItem
                                                                label="Min age"
                                                                description="Please input min age"
                                                            >
                                                                <MotalentInput
                                                                    {...field}
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    placeholder="Input"
                                                                    type="number"
                                                                    onChange={({
                                                                        target
                                                                    }) => {
                                                                        field.onChange(
                                                                            toInt(
                                                                                target.value
                                                                            )
                                                                        );
                                                                    }}
                                                                />
                                                            </MotalentFormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className="w-full">
                                                    <FormField
                                                        control={control}
                                                        name={
                                                            getPreferenceKeyName(
                                                                index,
                                                                'max_age'
                                                            ) as 'preferences.0.max_age'
                                                        }
                                                        render={({ field }) => (
                                                            <MotalentFormItem
                                                                label="Max Age"
                                                                description="Please choose your max age"
                                                            >
                                                                <MotalentInput
                                                                    {...field}
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    placeholder="Input"
                                                                    type="number"
                                                                    onChange={({
                                                                        target
                                                                    }) => {
                                                                        field.onChange(
                                                                            toInt(
                                                                                target.value
                                                                            )
                                                                        );
                                                                    }}
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
                                                        name={
                                                            getPreferenceKeyName(
                                                                index,
                                                                'is_negotiable'
                                                            ) as 'preferences.0.is_negotiable'
                                                        }
                                                        render={({ field }) => (
                                                            <div className="flex gap-2 items-center">
                                                                <Checkbox
                                                                    checked={
                                                                        field.value
                                                                    }
                                                                    onCheckedChange={(
                                                                        value
                                                                    ) => {
                                                                        field.onChange(
                                                                            value
                                                                        );
                                                                    }}
                                                                />
                                                                <Label>
                                                                    Negotiable ?
                                                                </Label>
                                                            </div>
                                                        )}
                                                    />
                                                </div>

                                                <div className="w-full">
                                                    <FormField
                                                        control={control}
                                                        name={
                                                            getPreferenceKeyName(
                                                                index,
                                                                'is_dp'
                                                            ) as 'preferences.0.is_dp'
                                                        }
                                                        render={({ field }) => (
                                                            <div className="flex gap-2 items-center">
                                                                <Checkbox
                                                                    checked={
                                                                        field.value
                                                                    }
                                                                    onCheckedChange={(
                                                                        value
                                                                    ) => {
                                                                        field.onChange(
                                                                            value
                                                                        );
                                                                    }}
                                                                />
                                                                <Label>
                                                                    Is DP ?
                                                                </Label>
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </PreferenceCollapsible>
                                    ))}
                                </div>

                                <div className="flex flex-col w-full my-5">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={onAddMore}
                                    >
                                        <PlusIcon className="mr-1" />{' '}
                                        {fields.length === 0
                                            ? 'Add My Preference'
                                            : 'Add More'}
                                    </Button>
                                </div>

                                <div className="flex w-full justify-end self-end gap-3">
                                    <Button
                                        type="button"
                                        disabled={stepperContext?.isFirstStep}
                                        onClick={() => {
                                            stepperContext?.handlePrevStep();

                                            setPreferencesForm(
                                                getValues().preferences
                                            );
                                        }}
                                    >
                                        Prev
                                    </Button>

                                    <Button
                                        disabled={
                                            !formState.isValid || isLoading
                                        }
                                        isLoading={isLoading}
                                        loadingText="Submitting..."
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </MotalentCard>
                        );
                    }}
                </PreferenceArrayForms>
            )}
        </MotalentForm>
    );
}

interface PreferenceArrayFormsProps {
    children: (props: UseFieldArrayReturn<FormFieldSchema>) => React.ReactNode;
}

function PreferenceArrayForms({ children }: PreferenceArrayFormsProps) {
    const { control } = useFormContext<FormFieldSchema>();
    const methods = useFieldArray<FormFieldSchema>({
        control,
        name: 'preferences',
        keyName: 'id'
    });

    return <>{children(methods)}</>;
}

interface PreferenceCollapsibleProps extends HTMLAttributes<HTMLDivElement> {
    isOpen?: boolean;
    isDisabled?: boolean;
    onToggle?: (open: boolean) => void;
    fieldsLength?: number;
    currentIndex?: number;
    onRemovePreference?: (index: number) => void;
}

function PreferenceCollapsible({
    isOpen = true,
    isDisabled = false,
    fieldsLength = 0,
    currentIndex = 0,
    children,
    onToggle,
    onRemovePreference,
    ...rest
}: PreferenceCollapsibleProps) {
    const { collapsibleIndexs, toggleCollapsible } =
        useClientRegistrationFormWizard((state) => ({
            collapsibleIndexs: state.collapsibleIndexs,
            toggleCollapsible: state.toggleCollapsible
        }));

    const isCollapsibleOpen = collapsibleIndexs.includes(currentIndex);

    const [_isOpen, setIsOpen] = useState(isCollapsibleOpen || isOpen);

    function onOpenChange(open: boolean) {
        setIsOpen(open);
        onToggle && onToggle(open);
        toggleCollapsible(currentIndex);
    }

    return (
        <Collapsible
            open={_isOpen}
            disabled={isDisabled}
            onOpenChange={onOpenChange}
            {...rest}
        >
            <div className="flex items-center justify-between space-x-4">
                <h1 className="text-lg ">
                    Preference {currentIndex + 1} of {fieldsLength}
                </h1>
                <div className="flex items-center space-x-4">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-red-400"
                        onClick={() =>
                            onRemovePreference &&
                            onRemovePreference(currentIndex)
                        }
                    >
                        <Trash2 />
                    </Button>
                    <CollapsibleTrigger
                        asChild
                        className="flex flex-row justify-end"
                    >
                        <Button type="button" variant="secondary" size="sm">
                            {_isOpen ? <ChevronsUpDown /> : <ChevronsDownUp />}
                            <span className="sr-only">Toggle</span>
                        </Button>
                    </CollapsibleTrigger>
                </div>
            </div>

            <CollapsibleContent className="flex flex-col gap-4">
                {children}
            </CollapsibleContent>
        </Collapsible>
    );
}

function LocationForms({ currentIndex = 0 }: { currentIndex?: number }) {
    const { control, getValues, setValue } = useFormContext<FormFieldSchema>();

    const setSearchPreferencesForm = useClientRegistrationFormWizard(
        (state) => state.setSearchPreferencesForm
    );

    const getPreferenceByIndexValues = () =>
        getValues(`preferences.${currentIndex}`);

    const setPreferenceByIndexValues = (
        value: Partial<PreferenceFieldValues>
    ) => {
        setValue(`preferences.${currentIndex}`, {
            ...getPreferenceByIndexValues(),
            ...value
        });
    };

    const provinceValue = getPreferenceByIndexValues().province_id;
    const regencyValue = getPreferenceByIndexValues().regency_id;
    const districtValue = getPreferenceByIndexValues().district_id;

    const { data: provinceOptions, isLoading: isLoadingProvinceOptions } =
        useQueryGetProvinces(['provinces', currentIndex]);

    const { data: regencyOptions, isLoading: isLoadingRegencyOptions } =
        useQueryGetRegencies(provinceValue, [
            'regencies',
            provinceValue,
            currentIndex
        ]);

    const { data: districtOptions, isLoading: isLoadingDistrictOptions } =
        useQueryGetDistricts(regencyValue, [
            'districts',
            regencyValue,
            currentIndex
        ]);

    const { data: villageOptions, isLoading: isLoadingVillageOptions } =
        useQueryGetVillages(districtValue, [
            'villages',
            districtValue,
            currentIndex
        ]);

    function handleLocationChange<T extends FieldPath<FormFieldSchema>>(
        field: ControllerRenderProps<FormFieldSchema, T>,
        type: TypeLocationChange
    ) {
        return function (value: string) {
            setSearchPreferencesForm(currentIndex, {
                ...getPreferenceByIndexValues(),
                [type]: value
            });

            field.onChange(value);

            if (type === 'province_id') {
                setPreferenceByIndexValues({
                    regency_id: '',
                    district_id: '',
                    village_id: ''
                });
            }

            if (type === 'regency_id') {
                setPreferenceByIndexValues({
                    district_id: '',
                    village_id: ''
                });
            }

            if (type === 'district_id') {
                setPreferenceByIndexValues({
                    village_id: ''
                });
            }
        };
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-center gap-x-5 gap-y-10">
                <div className="w-full">
                    <FormField
                        control={control}
                        name={
                            getPreferenceKeyName(
                                currentIndex,
                                'province_id'
                            ) as 'preferences.0.province_id'
                        }
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
                                    placeholder="Select Province"
                                />
                            </MotalentFormItem>
                        )}
                    />
                </div>

                <div className="w-full">
                    <FormField
                        control={control}
                        name={
                            getPreferenceKeyName(
                                currentIndex,
                                'regency_id'
                            ) as 'preferences.0.regency_id'
                        }
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
                                    disabled={
                                        !!!getPreferenceByIndexValues()
                                            .province_id
                                    }
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
                        name={
                            getPreferenceKeyName(
                                currentIndex,
                                'district_id'
                            ) as 'preferences.0.district_id'
                        }
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
                                    disabled={
                                        !!!getPreferenceByIndexValues()
                                            .regency_id
                                    }
                                />
                            </MotalentFormItem>
                        )}
                    />
                </div>

                <div className="w-full">
                    <FormField
                        control={control}
                        name={
                            getPreferenceKeyName(
                                currentIndex,
                                'village_id'
                            ) as 'preferences.0.village_id'
                        }
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
                                    disabled={
                                        !!!getPreferenceByIndexValues()
                                            .district_id
                                    }
                                />
                            </MotalentFormItem>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
