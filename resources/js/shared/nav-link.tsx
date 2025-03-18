import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

type NavLinkProps = PropsWithChildren<{
    indexers?: string[] | null;
    url?: string;
    type?: "base" | "base-responsive";
    className?: string;
}>;

const getStyleLinkBase = (active: boolean) => {
    return active
        ? "text-sm text-primary cursor-pointer  rounded-lg"
        : "text-sm text-muted-foreground cursor-pointer  rounded-lg text-gray-700 dark:text-gray-100 transition-all hover:text-primary";
};

const getStyleLinkBaseResponsive = (active: boolean) => {
    return active
        ? "text-sm p-2 bg-gray-50 dark:bg-gray-700 border-primary  cursor-pointer  rounded-md border"
        : "text-sm p-2 bg-gray-50 dark:bg-gray-700 hover:border-primary  cursor-pointer  rounded-md border";
};

export const isActive = (
    path: string,
    url: string,
    indexers: Array<string>
) => {
    try {
        if (indexers.length === 0) {
            const newUrl = new URL(url);

            return newUrl.pathname === path;
        }

        const validated = indexers.map((indexer) => path.includes(indexer));

        return validated.includes(true);
    } catch (error) {
        console.log("ERROR NAVLINK : ", error);
    }

    return false;
};

export const NavLink = ({
    url = "",
    indexers = [],
    type = "base",
    className = "",
    children,
}: NavLinkProps) => {
    const pathname = location.pathname;
    let classNameStyle = "";

    if (indexers) {
        classNameStyle =
            type === "base"
                ? getStyleLinkBase(isActive(pathname, url, indexers))
                : (classNameStyle = getStyleLinkBaseResponsive(
                      isActive(pathname, url, indexers)
                  ));
    } else {
        classNameStyle =
            type === "base"
                ? getStyleLinkBase(isActive(pathname, url, []))
                : (classNameStyle = getStyleLinkBaseResponsive(
                      isActive(pathname, url, [])
                  ));
    }

    return (
        <Link href={url} className={cn(classNameStyle, className)}>
            {children}
        </Link>
    );
};

export const isActiveLink = (url: string, indexers: Array<string> = []) => {
    const path = location.pathname;

    if (indexers.length === 0) {
        const newUrl = new URL(url);

        return newUrl.pathname === path;
    }

    const validated = indexers.map((indexer) => path.includes(indexer));

    return validated.includes(true);
};
