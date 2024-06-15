export default function ServerCard({
    serverName,
    game,
    region,
}: {
    serverName: string;
    game: string;
    region: string;
}) {
    return (
        <div className="w-full ">
            <div className="bg-white rounded-lg border overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
                <div className="p-4 ">
                    <div className="flex items-center justify-between">
                        <h1 className="text-l font-bold"> {serverName} </h1>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">
                        {game} | {region}
                    </p>
                </div>
            </div>
        </div>
    );
}
