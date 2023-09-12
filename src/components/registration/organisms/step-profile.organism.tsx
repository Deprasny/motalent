import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import MotalentForm from '@/components/shared/molecules/motalent-form';
import MotalentFormItem from '@/components/shared/molecules/motalent-form-item';
import MotalentInput from '@/components/shared/molecules/motalent-input';
import MotalentSelect from '@/components/shared/molecules/motalent-select';
import { FormField } from '@/components/ui/form';
import { SelectOptions } from '@/interfaces/global.interface';

import { InferZodSchema } from '@/interfaces/zod.interface';

import { ClientProfileFormState } from '@/stores/client-registration-form-wizard.store';

const formSchema = z.object({
    name: z.string().nonempty(),
    address: z.string().nonempty(),
    age: z.number(),
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
    async function handleSubmit(data: FieldValues) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data);
            }, 4000);
        });
    }
    return (
        <MotalentForm<FieldValues, object, FieldValues>
            onSubmit={async (data) => await handleSubmit(data)}
            resolver={zodResolver(formSchema)}
            defaultValues={{
                name: '',
                address: '',
                age: 0,
                blood_type: '',
                dob: '',
                gender: ''
            }}
            mode="onChange"
        >
            {({ control }) => (
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
                                            value={field.value?.toString()}
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
                                render={({ field }) => (
                                    <MotalentFormItem
                                        label="Gender"
                                        description="Please choose your gender"
                                    >
                                        <MotalentInput
                                            {...field}
                                            value={field.value}
                                            placeholder="Input your gender"
                                        />
                                    </MotalentFormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
            )}
        </MotalentForm>
    );
};

export default StepProfile;
