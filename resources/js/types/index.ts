import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

interface FlashMessage {
    toast: string | null;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    flashMessage: FlashMessage;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Family {
    id: number;
    name: string;
    description: string | null;
    user_id: number;
    user: User;
    peoples: People[];
    created_at: string;
    updated_at: string;
}

export interface People {
    id: number;
    image: string
    full_name: string;
    gender: string;
    relation_family: string;
    family_id: number;
    family: Family;
    birth: string;
    created_at: string;
    updated_at: string;
}

export interface FormatterObject {
    id: string;
    name: string;
}

export interface PaginationDataLink {
    url: string;
    label: string;
    active: boolean;
}

export interface PaginationData<D> {
    current_page: number;
    data: D[];
    first_page_url: string;
    from: null;
    last_page: number;
    last_page_url: string;
    links: PaginationDataLink[];
    next_page_url: null;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: null;
    total: number;
}
