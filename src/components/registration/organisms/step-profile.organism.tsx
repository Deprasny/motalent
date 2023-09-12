import { MotalentDatePicker } from '@/components/shared/molecules/motalent-date-picker';
import MotalentForm from '@/components/shared/molecules/motalent-form';
import MotalentFormItem from '@/components/shared/molecules/motalent-form-item';
import MotalentInput from '@/components/shared/molecules/motalent-input';
import MotalentSelect from '@/components/shared/molecules/motalent-select';
import { FormField } from '@/components/ui/form';
import { SelectOptions } from '@/interfaces/global.interface';

import { ClientProfileFormState } from '@/stores/client-registration-form-wizard.store';

type FieldValues = ClientProfileFormState;

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
    return (
        <MotalentForm<FieldValues, object, FieldValues> onSubmit={(data) => {}}>
            {({ control }) => (
                <div className="flex flex-col gap-4">
                    <FormField
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <MotalentFormItem
                                label="Email"
                                description="Please input your name.."
                            >
                                <MotalentInput
                                    placeholder="Input your name"
                                    {...field}
                                />
                            </MotalentFormItem>
                        )}
                    />

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

                    <FormField
                        control={control}
                        name="blood_type"
                        render={({ field }) => (
                            <MotalentFormItem
                                label="Blood Type"
                                description="Please choose your blood type"
                            >
                                <MotalentSelect
                                    defaultValue={field.value}
                                    value={field.value}
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    ref={field.ref}
                                    options={BLOOD_TYPES}
                                />
                            </MotalentFormItem>
                        )}
                    />

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
                                    value={field.value?.toString()}
                                    type="date"
                                />
                            </MotalentFormItem>
                        )}
                    />
                </div>
            )}
        </MotalentForm>
    );
};

export default StepProfile;
