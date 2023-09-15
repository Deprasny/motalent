import {
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';

interface MotalentFormItemProps {
    label?: string;
    children?: React.ReactNode;
    description?: string;
    message?: string;
}

export default function MotalentFormItem({
    label,
    children,
    description,
    message
}: MotalentFormItemProps) {
    return (
        <FormItem>
            <FormLabel className="">{label}</FormLabel>
            <FormControl>{children}</FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage>{message}</FormMessage>
        </FormItem>
    );
}
