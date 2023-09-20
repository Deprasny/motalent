import Navbar from '@/components/layouts/navbar.layout';
import ProfileLayout from '@/components/layouts/profile.layout';
import ProfileForm from '@/components/profile/organism/profile-form';
import { SidebarNav } from '@/components/profile/organism/sidebar-nav';
import { Separator } from '@/components/ui/separator';
import React from 'react';

interface SettingsLayoutProps {
    children: React.ReactNode;
}

const Profile = ({ children }: SettingsLayoutProps) => {
    return (
        <Navbar>
            <ProfileLayout>
                <ProfileForm />
            </ProfileLayout>
        </Navbar>
    );
};

export default Profile;
