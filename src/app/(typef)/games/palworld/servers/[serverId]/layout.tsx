import { Note } from "@/(global)/components/notes/notes";
import ServerLayout from "@/(global)/components/server/server-layout";

const routes = [
    {
        label: "Overview",
        path: "overview",
    },
    {
        label: "Commands",
        path: "commands",
    },
    {
        label: "Settings",
        path: "settings",
    },
    {
        label: "Shop",
        path: "shop",
    },
];

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ServerLayout routes={routes} serverName="Astraea Palworld">
            <Note type="warning">
                Free weekend servers are only available from Friday 8:00 PM to
                Sunday 10:00 PM.
            </Note>
            {children}
        </ServerLayout>
    );
}
