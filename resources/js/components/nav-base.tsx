import { Button } from '@/components/ui/button';
import { AuthUserOption } from '@/shared/auth-user-option';
import { NavLink } from '@/shared/nav-link';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import AppLogoIcon from './app-logo-icon';
import AppearanceToggleDropdown from './appearance-dropdown';
import { ButtonLink } from './ui/button-link';

export const NavbarBase = () => {
    const { auth } = usePage<SharedData>().props;

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navItems = [
        { label: 'Accueil', href: route('welcome') },
        { label: 'A propos', href: route('about') },
        { label: 'Ma famille', href: route('family-tree') },
    ];

    return (
        <nav className="bg-background/95 border-border sticky top-0 z-50 border-b backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center">
                        <AppLogoIcon height={25} width={25} />
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden items-center space-x-1 lg:flex">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.label}
                                url={item.href}
                                className="hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm font-medium transition-colors"
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right side items */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center gap-4">
                            {/* <ThemeToggle variant="ghost" /> */}

                            <AppearanceToggleDropdown />

                            {auth.user ? (
                                <AuthUserOption user={auth.user} />
                            ) : (
                                <ButtonLink dimension="sm" variant="ghost" href={route('login')}>
                                    Se connecter &rarr;
                                </ButtonLink>
                            )}
                        </div>
                        <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleMenu}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.label}
                                url={item.href}
                                className="hover:bg-accent hover:text-accent-foreground block px-4 py-2 text-sm transition-colors"
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};
