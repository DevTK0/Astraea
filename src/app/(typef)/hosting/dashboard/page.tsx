import { Button } from "@/(global)/components/ui/button";
import ServerCard from "./(local)/server-card";

export default function Hosting() {
    return (
        <main className="flex flex-1 flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Servers</h1>
                <Button> Create </Button>
            </div>
            <div className="grid grid-cols-3 space-x-4">
                <ServerCard
                    game="Palworld"
                    serverName="Astraea Server 1"
                    region="US East"
                />
                <ServerCard
                    game="V Rising"
                    serverName="Astraea Server 2"
                    region="US East"
                />
            </div>
        </main>
    );
}
