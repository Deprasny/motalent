import { zodResolver } from '@hookform/resolvers/zod';
import { Session } from 'next-auth';
import { z } from 'zod';

import MotalentForm from '@/components/shared/molecules/motalent-form';
import MotalentFormItem from '@/components/shared/molecules/motalent-form-item';
import MotalentInput from '@/components/shared/molecules/motalent-input';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form';

import { useUpdateProfile } from '@/hooks/auth/useUpdateProfile';

import { UpdateAccountRequestBody } from '@/interfaces/auth.interface';

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
        password: z.string().optional(),
        password_confirmation: z.string()
    })

    .refine(
        (data) => {
            if (data.password_confirmation) {
                return !!data.password;
            }
            return true;
        },
        {
            message: 'Fill in the password before confirming.',
            path: ['password_confirmation']
        }
    )

    .refine((data) => data.password === data.password_confirmation, {
        message: 'Passwords do not match.',
        path: ['password_confirmation']
    });

type ProfileValues = UpdateAccountRequestBody;

interface Props {
    session: Session;
}

const ProfileForm = (session: Props) => {
    const { name, email, id } = session.session.user;
    const { mutateAsync } = useUpdateProfile();

    const handleSubmit = async (data: ProfileValues) => {
        const updatedData: ProfileValues = { ...data, id: id.toString() };
        if (!updatedData.password) {
            delete updatedData.password;
            delete updatedData.password_confirmation;
        }
        mutateAsync(updatedData);
    };

    return (
        <MotalentForm<ProfileValues, object, ProfileValues>
            onSubmit={async (data) => await handleSubmit(data)}
            resolver={zodResolver(formSchema)}
            defaultValues={{
                email: email || '',
                name: name || '',
                password: '',
                password_confirmation: ''
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
                            name="password_confirmation"
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

export default ProfileForm;
