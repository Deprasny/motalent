import { UserNav } from '../shared/organisms/motalent-user-nav.organism';
import { useSession } from 'next-auth/react';

interface INavbarProps {
    children: React.ReactNode;
}

const Navbar = ({ children }: INavbarProps) => {
    const { data } = useSession();
    return (
        <div>
            <div className="border-b">
                <div className="flex items-center my-4 justify-between w-[1240px] mx-auto ">
                    <div className="w-[295px]">Logo</div>
                    <div className="flex items-center justify-center gap-x-10">
                        <p>Talent</p>
                        <p>Offer</p>
                        <p>Explore</p>
                        <p>FAQ</p>
                    </div>
                    <div className="flex items-center justify-end w-[295px] gap-x-2">
                        <span className="text-sm">{data?.user.name}</span>
                        <UserNav />
                    </div>
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
};

export default Navbar;
