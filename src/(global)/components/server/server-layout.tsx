"use client";

import { Button } from "@/(global)/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/(global)/lib/css/utils";
import { Icons } from "../ui/icons";
import { Note } from "../notes/notes";

export default function ServerLayout({
    children,
    routes,
    serverName,
}: Readonly<{
    children: React.ReactNode;
    routes: { label: string; path: string }[];
    serverName: string;
}>) {
    const path = usePathname();
    const basePath = path.substring(0, path.lastIndexOf("/"));
    const current = path.substring(path.lastIndexOf("/") + 1);

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-semibold"
                        >
                            <span className="">{serverName}</span>
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="ml-auto h-8 w-8"
                        >
                            <Icons.gear className="h-5 w-5" />
                            <span className="sr-only">
                                Toggle notifications
                            </span>
                        </Button>
                    </div>
                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            {routes.map((route) => (
                                <Link
                                    key={route.label}
                                    href={`${basePath}/${route.path}`}
                                    className={cn(
                                        `flex items-center gap-3 rounded-lg px-3 py-2 text-primary  transition-all hover:text-primary`,
                                        current === route.path
                                            ? "bg-muted text-primary"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {route.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
            <div className="w-full flex-1 h-full px-4 py-6 space-y-4 lg:px-8 ">
                {children}
            </div>
        </div>
    );
}
