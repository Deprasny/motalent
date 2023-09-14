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
import { LoaderIcon } from 'lucide-react';

interface MotalentSelectProps extends SelectPrimitive.SelectProps {
    options?: SelectOptions;
    isLoading?: boolean;
    placeholder?: string;
}

const MotalentSelect = forwardRef<HTMLButtonElement, MotalentSelectProps>(
    ({ options, isLoading, placeholder, ...restProps }, ref) => {
        return (
            <Select {...restProps}>
                <SelectTrigger ref={ref}>
                    <SelectValue
                        placeholder={placeholder || 'Select Something..'}
                    />

                    {isLoading && (
                        <LoaderIcon className="w-5 h-5 text-gray-400 animate-spin" />
                    )}
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
