import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
    roles?: UserRole[];
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

export interface UserRole {
    name: string;
}

export interface Post {
    id: number;
    title: string;
    slug: string;
    image: string;
    content: string;
    created_at: string;
    updated_at: string;
    user: User;
    user_id: number;
    categories: Category[];
    comments: Comment[];
}

export interface Event {
    id: number;
    title: string;
    slug: string;
    description: string;
    type: string;
    start_at: string;
    image: string;
    created_at: string;
    updated_at: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
    posts: Post[];
}

export interface Comment {
    id: number;
    username: string;
    message: string;
    post: Post;
    lock: boolean;
    post_id: number;
    created_at: string;
    updated_at: string;
    reply_comments: ReplyComment[];
}

export interface ReplyComment {
    id: number;
    username: string;
    message: string;
    lock: boolean;
    created_at: string;
    updated_at: string;
    comment_id: number;
}

export interface Quiz {
    id: number;
    question: string;
    answer: string;
    created_at: string;
    updated_at: string;
}

export interface Contact {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
    updated_at: string;
}

export interface Option {
    id: number;
    name: string;
    alias: string;
    levels: Level[];
    created_at: string;
    updated_at: string;
}

export interface Level {
    id: number;
    name: string;
    alias: string;
    option_id: number;
    option: Option;
    created_at: string;
    updated_at: string;
}

export interface Professor {
    id: number;
    full_name: string;
    phone: string;
    gender: string;
    speciality: string;
    courses: Course[];
    user: User;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export interface WorkPratical {
    id: number;
    title: string;
    slug: string;
    document: string;
    description: string;
    course_id: number;
    course: Course;
    year_academic_id: number;
    year_academic: YearAcademic;
    price: number;
    created_at: string;
    updated_at: string;
}

export interface SupportCourse {
    id: number;
    title: string;
    slug: string;
    document: string;
    description: string;
    course_id: number;
    course: Course;
    year_academic_id: number;
    year_academic: YearAcademic;
    created_at: string;
    updated_at: string;
}

export interface Course {
    id: number;
    name: string;
    alias: string;
    professor_id: number;
    professor: Professor;
    levels: Level[];
    work_praticals: WorkPratical[];
    support_courses: SupportCourse[];
    created_at: string;
    updated_at: string;
}

export interface YearAcademic {
    id: number;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Student {
    id: number;
    full_name: string;
    phone: string;
    gender: string;
    registration_number: string;
    user: User;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export interface Payment {
    id: number;
    amount: number;
    status: string;
    student_id: number;
    student: Student;
    work_pratical_id: number;
    work_pratical: WorkPratical;
    year_academic_id: number | null;
    year_academic: YearAcademic | null;
    level_id: number | null;
    level: Level;
    mobile_money_name: string;
    payment_at: string;
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
