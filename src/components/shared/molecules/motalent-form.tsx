/* eslint-disable react-hooks/exhaustive-deps */
import { Form } from '@/components/ui/form';
import React, { useEffect } from 'react';
import {
    FieldValues,
    SubmitHandler,
    UseFormProps,
    UseFormReturn,
    useForm
} from 'react-hook-form';

interface MotalentFormProps<
    TFieldValues extends FieldValues,
    TContext,
    TTransformedValues extends FieldValues
> extends UseFormProps<TFieldValues, TContext> {
    onSubmit: TTransformedValues extends FieldValues
        ? SubmitHandler<TTransformedValues>
        : SubmitHandler<TFieldValues>;
    onInvalid?: () => void;
    onValid?: () => void;
    children: (
        props: UseFormReturn<TFieldValues, TContext, TTransformedValues>
    ) => React.ReactNode;
}

export default function MotalentForm<
    TFieldValues extends FieldValues,
    TContext,
    TTransformedValues extends FieldValues
>({
    children,
    onSubmit,
    onInvalid,
    onValid,
    ...restProps
}: MotalentFormProps<TFieldValues, TContext, TTransformedValues>) {
    const methods = useForm<TFieldValues, TContext, TTransformedValues>({
        ...restProps
    });

    return (
        <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {children(methods)}
            </form>
        </Form>
    );
}
