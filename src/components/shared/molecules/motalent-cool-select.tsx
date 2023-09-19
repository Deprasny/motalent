import { SelectOption } from '@/interfaces/global.interface';
import clsx from 'clsx';
import { Check, XIcon } from 'lucide-react';
import Select, {
    ClearIndicatorProps,
    MultiValueRemoveProps,
    GroupBase,
    Props,
    MultiValue,
    components
} from 'react-select';

interface MotalentCoolSelectProps<
    Option = unknown,
    IsMulti extends boolean = boolean,
    Group extends GroupBase<Option> = GroupBase<Option>
> extends Props<Option, IsMulti, Group> {}

export default function MotalentCoolSelect<
    Option = unknown,
    IsMulti extends boolean = boolean,
    Group extends GroupBase<Option> = GroupBase<Option>
>({ options = [], ...props }: MotalentCoolSelectProps<Option, IsMulti, Group>) {
    return (
        <Select
            {...props}
            options={options}
            components={{
                ClearIndicator: CustomClearIndicator,
                MultiValueRemove: CustomMultiValueRemove,
                Option: ({ children, ...props }) => (
                    <components.Option {...props}>
                        <div className="flex items-center">
                            {children}
                            <Check
                                size={18}
                                className={clsx('ml-auto font-bold', {
                                    hidden: !props.isSelected,
                                    'text-slate-500': props.isSelected,
                                    'text-transparent': !props.isSelected
                                })}
                            />
                        </div>
                    </components.Option>
                )
            }}
            styles={{
                control: (base) => ({
                    ...base,
                    fontSize: '0.875rem',
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.5rem',
                    boxShadow: 'none',
                    '&:hover': {
                        border: '1px solid #E5E7EB'
                    }
                }),
                multiValue: (base) => ({
                    ...base,
                    borderRadius: '0.5rem'
                }),
                option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? '#F3F4F6' : 'white',
                    color: state.isFocused ? '#111827' : '#4B5563',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#F3F4F6'
                    }
                })
            }}
        />
    );
}

const CustomClearIndicator = <
    Option = unknown,
    IsMulti extends boolean = boolean,
    Group extends GroupBase<Option> = GroupBase<Option>
>(
    props: ClearIndicatorProps<Option, IsMulti, Group>
) => {
    return (
        <div {...props.innerProps}>
            <XIcon size={16} className="mr-2 text-slate-500" />
        </div>
    );
};

const CustomMultiValueRemove = <
    Option = unknown,
    IsMulti extends boolean = boolean,
    Group extends GroupBase<Option> = GroupBase<Option>
>(
    props: MultiValueRemoveProps<Option, IsMulti, Group>
) => {
    return (
        <components.MultiValueRemove {...props}>
            <XIcon size={16} className="text-slate-500" />
        </components.MultiValueRemove>
    );
};

export function getMultiValues<Option, V>(
    options: MultiValue<Option> = [],
    value: V[],
    getOptionValue: (option: Option) => V
) {
    return options.filter((option) => value.includes(getOptionValue(option)));
}

export function getSingleValue<Option extends SelectOption>(
    options: Option[],
    value: any
) {
    return options.find((option) => option.value === value);
}

export function onMultiChange<Option>(
    values: MultiValue<Option>,
    onChange: (value: any[]) => void,
    getOptionValue: (option: Option) => Option
) {
    onChange(values.map((option) => getOptionValue(option)));
}
