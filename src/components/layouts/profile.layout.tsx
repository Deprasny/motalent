import React from 'react';

import { SidebarNav } from '../profile/organism/sidebar-nav';
import { Separator } from '../ui/separator';

const sidebarNavItems = [
    {
        title: 'Setting Account',
        href: '/profile/account'
    },
    {
        title: 'Setting Client',
        href: '/profile/setting'
    }
];

interface IProfileProps {
    children: React.ReactNode;
}
const ProfileLayout = ({ children }: IProfileProps) => {
    return (
        <>
            <div className="space-y-6 p-10 pb-16 w-[1180px] mx-auto">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Settings
                    </h2>
                    <p className="text-muted-foreground">
                        Manage your account settings.
                    </p>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>
                    <div className="flex-1 lg:max-w-2xl">{children}</div>
                </div>
            </div>
        </>
    );
};

export default ProfileLayout;
