import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';

import Profile from '../layout';

import ProfileForm from '@/components/profile/organism/profile-form';

import { getAuthServerSession } from '@/lib/get-auth-server-session';

interface AccountProps {
    session: Session;
}

const Setting = ({ session }: AccountProps) => {
    return (
        <Profile>
            <ProfileForm session={session} />
        </Profile>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getAuthServerSession(context);
    return {
        props: { session: session || null }
    };
};

export default Setting;
