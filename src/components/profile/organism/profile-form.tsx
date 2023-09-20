import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import MotalentForm from '@/components/shared/molecules/motalent-form';
import MotalentFormItem from '@/components/shared/molecules/motalent-form-item';
import MotalentInput from '@/components/shared/molecules/motalent-input';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form';
import { InferZodSchema } from '@/interfaces/zod.interface';
import { useSession } from 'next-auth/react';

const formSchema = z
    .object({
        email: z
            .string()
            .min(2, {
                message: 'Email is too short.'
            })
            .email({
                message: 'Email is invalid.'
            }),
        name: z.string().min(2),
        password: z.string().nonempty('Password is required.'),
        passwordConfirmation: z.string()
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match.',
        path: ['passwordConfirmation']
    });

type ProfileValues = InferZodSchema<typeof formSchema>;

const ProfileForm = () => {
    const { data: session } = useSession();
    const handleSubmit = async (data: ProfileValues) => {
        console.table(data);
    };

    return (
        <MotalentForm<ProfileValues, object, ProfileValues>
            onSubmit={async (data) => await handleSubmit(data)}
            resolver={zodResolver(formSchema)}
            defaultValues={{
                email: session?.user?.email || '',
                name: session?.user?.name || '',
                password: '',
                passwordConfirmation: ''
            }}
            mode="onChange"
        >
            {({ control, formState }) => (
                <>
                    <div className="flex flex-col gap-4">
                        <FormField
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <MotalentFormItem
                                    label="Email"
                                    description="Your email will be protected by our policy."
                                >
                                    <MotalentInput
                                        placeholder="Please enter your email here.."
                                        {...field}
                                    />
                                </MotalentFormItem>
                            )}
                        />

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
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <MotalentFormItem label="Password">
                                    <MotalentInput
                                        placeholder="Please enter your password here.."
                                        disabled={formState.isSubmitting}
                                        type="password"
                                        {...field}
                                    />
                                </MotalentFormItem>
                            )}
                        />

                        <FormField
                            name="passwordConfirmation"
                            control={control}
                            render={({ field }) => (
                                <MotalentFormItem label="Password Confirmation">
                                    <MotalentInput
                                        placeholder="Please confirmation your password"
                                        disabled={formState.isSubmitting}
                                        type="password"
                                        {...field}
                                    />
                                </MotalentFormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-end items-end mt-5">
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

export default ProfileForm;
