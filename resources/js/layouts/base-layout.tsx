import { NavbarBase } from '@/components/nav-base';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export const BaseLayout = ({ children }: PropsWithChildren) => {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <NavbarBase />

            <main>{children}</main>
        </>
    );
};
