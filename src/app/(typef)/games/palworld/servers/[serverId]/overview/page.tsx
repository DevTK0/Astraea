import { ServerStatus } from "../../../../[game]/servers/[serverId]/overview/server-status/server-status";
import { ClientStatus } from "./client-status/client-status";
import { PlayerList } from "./player-list/player-list";

export default function Overview() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Overview</h1>
            </div>
            <div className="flex flex-row items-start space-x-2">
                <div className="w-full space-y-2 lg:w-3/4">
                    <ServerStatus />
                    <ClientStatus />
                </div>
                <PlayerList className="hidden w-1/4 lg:block" />
            </div>
        </main>
    );
}
