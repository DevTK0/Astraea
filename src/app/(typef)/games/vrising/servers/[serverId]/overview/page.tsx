import { getUser } from "@/(global)/lib/auth/server";
import { joinCommunity } from "@/(global)/services/database/communities";
import { ServerStatus } from "@/app/(typef)/games/[game]/servers/[serverId]/overview/server-status/server-status";

export default async function Overview() {
    const user = await getUser();

    // autojoin community
    joinCommunity(2, user.id);

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Overview</h1>
            </div>
            <div className="flex flex-row items-start space-x-2">
                <ServerStatus className="w-full space-y-2" portNum={9876} />
            </div>
        </main>
    );
}
