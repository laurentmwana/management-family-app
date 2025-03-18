import { cn } from "@/lib/utils";
import { InertiaLinkProps, Link } from "@inertiajs/react";
import { ButtonProps, buttonVariants } from "./button";

type ButtonLinkProps = InertiaLinkProps & {
    variant?: ButtonProps["variant"];
    dimension?: ButtonProps["size"];
};

export const ButtonLink = ({
    variant = "outline",
    href = "",
    dimension = "lg",
    children = null,
    className = "",
    target,
    ...props
}: ButtonLinkProps) => {
    return (
        <Link
            href={href}
            className={cn(
                buttonVariants({ variant, size: dimension, className })
            )}
            {...props}
        >
            {children}
        </Link>
    );
};
