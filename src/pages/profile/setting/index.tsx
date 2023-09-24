import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';

import Profile from '../layout';

import SettingForm from '@/components/profile/organism/setting-form';

import { getAuthServerSession } from '@/lib/get-auth-server-session';

interface SettingProps {
    session: Session;
}

const Setting = ({ session }: SettingProps) => {
    return (
        <Profile>
            <SettingForm session={session} />
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
