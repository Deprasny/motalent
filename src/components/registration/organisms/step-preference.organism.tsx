import MotalentForm from '@/components/shared/molecules/motalent-form';
import MotalentFormItem from '@/components/shared/molecules/motalent-form-item';
import MotalentInput from '@/components/shared/molecules/motalent-input';
import MotalentSelect from '@/components/shared/molecules/motalent-select';
import { useStepperContext } from '@/components/shared/organisms/stepper.organism';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible';
import { FormField } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
    useQueryGetDistricts,
    useQueryGetProvinces,
    useQueryGetRegencies,
    useQueryGetVillages
} from '@/hooks/general';
import { InferZodSchema } from '@/interfaces/zod.interface';
import {
    INITIAL_PREF_STATE,
    useClientRegistrationFormWizard
} from '@/stores/client-registration-form-wizard.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronsDownUp, ChevronsUpDown, PlusIcon, Trash2 } from 'lucide-react';
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

const formSchema = z.object({
    preferences: z.array(preferenceSchema).min(1).nonempty()
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

    function handleSubmit(data: FormFieldSchema) {
        setIsValidPreference(true);
        alert('Regsitration Complete');

        console.log({
            data,
            defaultPreferenceForm
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
        >
            {({ control, formState }) => (
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
                            <div className="flex flex-col gap-4">
                                <div className="pt-4">
                                    <p className="text-center text-gray-500">
                                        Fullfill your preference or criteria
                                        that you want to be matched!
                                    </p>
                                </div>

                                <div className="flex flex-col gap-8">
                                    {fields.map(({ id }, index) => (
                                        <PreferenceCollapsible
                                            key={index}
                                            currentIndex={index}
                                            onRemovePreference={
                                                onRemovePreference
                                            }
                                            fieldsLength={fields.length}
                                        >
                                            <LocationForms
                                                currentIndex={index}
                                            />

                                            <div className="flex items-center justify-center gap-x-5">
                                                <div className="w-full">
                                                    <FormField
                                                        control={control}
                                                        name={getPreferenceKeyName(
                                                            index,
                                                            'category_ids'
                                                        )}
                                                        render={({ field }) => (
                                                            <MotalentFormItem
                                                                label="Category"
                                                                description="Please choose your category"
                                                            >
                                                                <MotalentSelect
                                                                    defaultValue={field.value.toString()}
                                                                    value={
                                                                        field.value as string
                                                                    }
                                                                    onValueChange={
                                                                        field.onChange
                                                                    }
                                                                    ref={
                                                                        field.ref
                                                                    }
                                                                    options={
                                                                        EXAMPLE
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
                                                                index,
                                                                'min_price'
                                                            ) as 'preferences.0.min_price'
                                                        }
                                                        render={({ field }) => (
                                                            <MotalentFormItem
                                                                label="Min price"
                                                                description="Please input min price"
                                                            >
                                                                <MotalentInput
                                                                    {...field}
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    placeholder="Input"
                                                                    type="number"
                                                                    onChange={(
                                                                        val
                                                                    ) => {
                                                                        field.onChange(
                                                                            parseInt(
                                                                                val
                                                                                    .target
                                                                                    .value ||
                                                                                    String(
                                                                                        0
                                                                                    )
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
                                                                    onChange={(
                                                                        val
                                                                    ) => {
                                                                        field.onChange(
                                                                            parseInt(
                                                                                val
                                                                                    .target
                                                                                    .value ||
                                                                                    String(
                                                                                        0
                                                                                    )
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
                                                                    onChange={(
                                                                        val
                                                                    ) => {
                                                                        field.onChange(
                                                                            parseInt(
                                                                                val
                                                                                    .target
                                                                                    .value ||
                                                                                    String(
                                                                                        0
                                                                                    )
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
                                                                    onChange={(
                                                                        val
                                                                    ) => {
                                                                        field.onChange(
                                                                            parseInt(
                                                                                val
                                                                                    .target
                                                                                    .value ||
                                                                                    String(
                                                                                        0
                                                                                    )
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

                                <div className="flex flex-col w-full">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={onAddMore}
                                    >
                                        <PlusIcon className="mr-1" /> Add more
                                    </Button>
                                </div>

                                <div className="flex w-full justify-end self-end gap-3">
                                    <Button
                                        type="button"
                                        disabled={stepperContext?.isFirstStep}
                                        onClick={stepperContext?.handlePrevStep}
                                    >
                                        Prev
                                    </Button>

                                    <Button
                                        disabled={!formState.isValid}
                                        type="submit"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
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
    const randomKeyId = Math.random().toString(36).substr(2, 9);
    const [_isOpen, setIsOpen] = useState(false);

    const { collapsibleIndexs, toggleCollapsible } =
        useClientRegistrationFormWizard((state) => ({
            collapsibleIndexs: state.collapsibleIndexs,
            toggleCollapsible: state.toggleCollapsible
        }));

    const collapsibleCompId = `preference-${randomKeyId}`;

    const isDisableRemovePreference = fieldsLength === 1;
    const isCollapsibleOpen = collapsibleIndexs.includes(currentIndex);

    function onOpenChange(open: boolean) {
        setIsOpen(open);
        onToggle && onToggle(open);
        toggleCollapsible(currentIndex);
    }

    return (
        <Collapsible
            {...rest}
            id={collapsibleCompId}
            open={_isOpen || isCollapsibleOpen}
            disabled={isDisabled}
            onOpenChange={onOpenChange}
            key={randomKeyId}
            className="flex flex-col gap-4 border border-gray-200 rounded-md px-8 py-4"
        >
            <div className="flex items-center justify-between space-x-4">
                <h1 className="text-2xl font-bold">
                    Preference {currentIndex + 1} of {fieldsLength}
                </h1>

                <div className="flex items-center space-x-4">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={isDisableRemovePreference}
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

            <CollapsibleContent>{children}</CollapsibleContent>
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

    const { data: provinceOptions, isFetching: isLoadingProvinceOptions } =
        useQueryGetProvinces(['provinces', currentIndex]);

    const { data: regencyOptions, isFetching: isLoadingRegencyOptions } =
        useQueryGetRegencies(provinceValue, [
            'regencies',
            provinceValue,
            currentIndex
        ]);

    const { data: districtOptions, isFetching: isLoadingDistrictOptions } =
        useQueryGetDistricts(regencyValue, [
            'districts',
            regencyValue,
            currentIndex
        ]);

    const { data: villageOptions, isFetching: isLoadingVillageOptions } =
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
        <>
            <div className="flex items-center justify-center gap-x-5">
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
