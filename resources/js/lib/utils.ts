import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]): string => {
    return twMerge(clsx(inputs));
};

export const mergeParameterUrl = (url: string): string => {
    const nextUrl = new URL(url);
    const currentUrl = new URL(window.location.href);

    return '';
};

export const storageSourceUrl = (url: string): string => `/storage/${url}`;

export const truncate = (str: string, len: number, separator: string): string => {
    return len >= str.length ? str : str.substring(0, len) + separator;
};
