import ServerLayout from "@/(global)/components/server/server-layout";

const routes = [
    {
        label: "Dashboard",
        path: "dashboard",
    },
    {
        label: "Pricing",
        path: "pricing",
    },
];

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ServerLayout routes={routes} serverName="Hosting">
            {children}
        </ServerLayout>
    );
}
