import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

interface MotalentCard {
    label?: string;
    children?: React.ReactNode;
    description?: string;
    footer?: string;
}

export default function MotalentCard({
    label,
    children,
    description,
    footer
}: MotalentCard) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{label}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
            <CardFooter>{footer}</CardFooter>
        </Card>
    );
}
