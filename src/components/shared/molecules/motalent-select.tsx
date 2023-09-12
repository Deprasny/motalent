import { forwardRef } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { SelectOptions } from '@/interfaces/global.interface';
import * as SelectPrimitive from '@radix-ui/react-select';
import React from 'react';

interface MotalentSelectProps extends SelectPrimitive.SelectProps {
    options?: SelectOptions;
}

const MotalentSelect = forwardRef<HTMLButtonElement, MotalentSelectProps>(
    ({ options, ...restProps }, ref) => {
        return (
            <Select {...restProps}>
                <SelectTrigger ref={ref}>
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    {options?.map(({ label, value }, index) => (
                        <SelectItem key={`${index}_${label}`} value={value}>
                            {label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        );
    }
);

MotalentSelect.displayName = 'MotalentSelect';

export default MotalentSelect;
