import * as SelectPrimitive from '@radix-ui/react-select';
import { LoaderIcon } from 'lucide-react';
import { forwardRef } from 'react';
import React from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

import { SelectOptions } from '@/interfaces/global.interface';

interface MotalentSelectProps extends SelectPrimitive.SelectProps {
    options?: SelectOptions;
    isLoading?: boolean;
    placeholder?: string;
    height?: string;
}

const MotalentSelect = forwardRef<HTMLButtonElement, MotalentSelectProps>(
    (
        { options, isLoading, placeholder, height = 'h-[200px]', ...restProps },
        ref
    ) => {
        return (
            <Select {...restProps}>
                <SelectTrigger ref={ref}>
                    <SelectValue placeholder={placeholder || 'Select'} />

                    {isLoading && (
                        <LoaderIcon className="w-5 h-5 text-gray-400 animate-spin" />
                    )}
                </SelectTrigger>
                <SelectContent>
                    <ScrollArea className={height}>
                        {options?.map(({ label, value }, index) => (
                            <SelectItem key={`${index}_${label}`} value={value}>
                                {label}
                            </SelectItem>
                        ))}
                    </ScrollArea>
                </SelectContent>
            </Select>
        );
    }
);

MotalentSelect.displayName = 'MotalentSelect';

export default MotalentSelect;
