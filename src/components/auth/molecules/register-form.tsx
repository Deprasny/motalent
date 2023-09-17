import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import MotalentForm from '@/components/shared/molecules/motalent-form';
import MotalentFormItem from '@/components/shared/molecules/motalent-form-item';
import MotalentInput from '@/components/shared/molecules/motalent-input';
import { FormField } from '@/components/ui/form';

import { InferZodSchema } from '@/interfaces/zod.interface';
import { Button } from '@/components/ui/button';
import { useRegister } from '@/hooks/auth/useRegister';

const formSchema = z
    .object({
        name: z.string().nonempty('Name is required.'),
        email: z
            .string()
            .min(2, {
                message: 'Email is too short.'
            })
            .email({
                message: 'Email is invalid.'
            }),
        password: z
            .string()
            .nonempty('Password is required.')
            .min(8, 'Password is too short'),
        passwordConfirmation: z.string()
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match.',
        path: ['passwordConfirmation']
    });

type LoginFieldValues = InferZodSchema<typeof formSchema>;

export default function RegisterForm() {
    const { mutateAsync, isLoading } = useRegister();

    async function handleSubmit(data: LoginFieldValues) {
        await mutateAsync({
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.passwordConfirmation
        });
    }

    return (
        <MotalentForm<LoginFieldValues, object, LoginFieldValues>
            onSubmit={async (data) => await handleSubmit(data)}
            resolver={zodResolver(formSchema)}
            defaultValues={{
                name: '',
                email: '',
                password: '',
                passwordConfirmation: ''
            }}
            mode="onChange"
        >
            {({ control, formState }) => (
                <div className="flex flex-col gap-4">
                    <FormField
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <MotalentFormItem
                                label="Name"
                                description="Your name will be protected by our policy."
                            >
                                <MotalentInput
                                    placeholder="Please enter your name here.."
                                    {...field}
                                />
                            </MotalentFormItem>
                        )}
                    />

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
                                    type="email"
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
                                    placeholder="Confirmation your password here.."
                                    disabled={formState.isSubmitting}
                                    type="password"
                                    {...field}
                                />
                            </MotalentFormItem>
                        )}
                    />

                    <Button
                        loadingText="sign..."
                        isLoading={formState.isSubmitting || isLoading}
                        type="submit"
                    >
                        Register
                    </Button>
                </div>
            )}
        </MotalentForm>
    );
}
