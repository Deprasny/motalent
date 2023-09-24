import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string;
        title: string;
    }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
    const pathname = usePathname();

    return (
        <nav
            className={cn(
                'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
                className
            )}
            {...props}
        >
            {items.map((item) => (
                <Link key={item.href} href={item.href}>
                    <Button
                        variant="ghost"
                        className={cn(
                            pathname === item.href
                                ? 'bg-gray-200 hover:bg-gray-200'
                                : 'hover:bg-transparent hover:underline',
                            'justify-start'
                        )}
                    >
                        {item.title}
                    </Button>
                </Link>
            ))}
        </nav>
    );
}
