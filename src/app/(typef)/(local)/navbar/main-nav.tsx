import { cn } from "@/(global)/lib/css/utils";
import Link from "next/link";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <nav
            className={cn(
                "flex items-center space-x-4 lg:space-x-6",
                className
            )}
            {...props}
        >
            <Link
                href="/games"
                className="text-muted-foreground hover:text-foreground"
            >
                Games
            </Link>
            <Link
                href="/hosting/dashboard"
                className="text-muted-foreground hover:text-foreground"
            >
                Hosting
            </Link>
        </nav>
    );
}
