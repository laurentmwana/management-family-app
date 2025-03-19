import { NavbarBase } from '@/components/nav-base';
import { PropsWithChildren } from 'react';

export const BaseLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <NavbarBase />
            <main>{children}</main>
        </>
    );
};
