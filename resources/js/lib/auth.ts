import { UserRole } from '@/types';
import { UserRoleEnum } from './enum';

type ArrayUserRole = UserRole[] | undefined;

export const isAdminOrProfessor = (roles: ArrayUserRole) => {
    if (!roles || roles?.length === 0) return false;

    return roles.some((r) => r.name === UserRoleEnum.ROLE_ADMIN || r.name === UserRoleEnum.ROLE_PROFESSOR);
};
export const isAdmin = (roles: ArrayUserRole) => {
    if (!roles || roles?.length === 0) return false;

    return roles.some((r) => r.name === UserRoleEnum.ROLE_ADMIN);
};

export const isProfessor = (roles: ArrayUserRole) => {
    if (!roles || roles?.length === 0) return false;

    return roles.some((r) => r.name === UserRoleEnum.ROLE_PROFESSOR);
};

export const isStudent = (roles: ArrayUserRole) => {
    if (!roles || roles?.length === 0) return false;

    return roles.some((r) => r.name === UserRoleEnum.ROLE_STUDENT);
};

export const isAnonymous = (roles: ArrayUserRole) => {
    if (!roles || roles?.length === 0) return false;

    return roles.some((r) => r.name === UserRoleEnum.ROLE_ANONYMOUS);
};
