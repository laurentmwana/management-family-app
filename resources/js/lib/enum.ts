export enum PAYMENT_STATE {
    PENDING = 'en cours',
    CANCELED = 'annuler',
    SUCCESS = 'succès',
}

export enum UserRoleEnum {
    ROLE_ANONYMOUS = 'inconnu(e)',
    ROLE_ADMIN = 'administrateur',
    ROLE_PROFESSOR = 'professeur',
    ROLE_STUDENT = 'étudiant',
}

export enum UserPermissionEnum {
    FULL = '*',

    // POST
    POST_EDIT = 'POST_EDIT',
    POST_DELETE = 'POST_DELETE',
    POST_CREATE = 'POST_CREATE',
    POST_SHOW = 'POST_SHOW',
    POST_COMMENT = 'POST_COMMENT',

    // Category
    CATEGORY_EDIT = 'CATEGORY_EDIT',
    CATEGORY_DELETE = 'CATEGORY_DELETE',
    CATEGORY_CREATE = 'CATEGORY_CREATE',
    CATEGORY_SHOW = 'CATEGORY_SHOW',

    COMMENT_SHOW = 'COMMENT_SHOW',
    COMMENT_LOCK = 'COMMENT_LOCK',
}
