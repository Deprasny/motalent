import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

import { useFormField } from '@/components/ui/form';
import { Input, InputProps } from '@/components/ui/input';

const motalentCVA = cva([''], {
    variants: {
        size: {
            sm: ''
        },
        isError: {
            true: 'ring-1 ring-red-500 focus-visible:ring-red-500 focus-visible:ring-offset-0'
        }
    },
    defaultVariants: {
        isError: false
    }
});

type MotalentInputProps = InputProps & VariantProps<typeof motalentCVA>;

const MotalentInput = React.forwardRef<HTMLInputElement, MotalentInputProps>(
    (props, ref) => {
        const { id, invalid } = useFormField();

        return (
            <Input
                id={id}
                className={motalentCVA({
                    size: props.size,
                    isError: props.isError || invalid
                })}
                ref={ref}
                {...props}
            />
        );
    }
);

MotalentInput.displayName = 'Motalent Input';
export default MotalentInput;
