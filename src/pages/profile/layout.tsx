import { GetServerSideProps } from 'next';

import Navbar from '@/components/layouts/navbar.layout';
import ProfileLayout from '@/components/layouts/profile.layout';

interface SettingsLayoutProps {
    children: React.ReactNode;
}

const Profile = ({ children }: SettingsLayoutProps) => {
    return (
        <Navbar>
            <ProfileLayout>{children}</ProfileLayout>
        </Navbar>
    );
};

export default Profile;
