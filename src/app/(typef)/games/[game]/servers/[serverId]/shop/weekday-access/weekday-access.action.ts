"use server";

import { action } from "@/(global)/lib/request/next-safe-action";
import { z } from "zod";
import {
    getWeekdayAccess,
    setWeekdayAccess,
} from "@/(global)/services/database/db-configs";
import { registerAutostop } from "@/(global)/services/auto-stop/service";
import { getCoins, setCoins } from "@/(global)/services/database/users";
import { getUser } from "@/(global)/lib/auth/actions";
import { revalidatePath } from "next/cache";
import { ServerError } from "@/(global)/lib/exception/next-safe-action";

const weekdayAccessSchema = z.object({
    serverId: z.number(),
    days: z.number(),
});

export const weekdayAccessAction = action(
    weekdayAccessSchema,
    async ({ serverId, days }) => {
        const access = await getWeekdayAccess(serverId);

        if (access) throw new ServerError("Weekday access is already active.");

        // check if sufficient coins
        const user = await getUser();
        const coins = await getCoins(user.id);
        const cost = 100 * days;

        if (coins < cost) {
            throw new ServerError("Insufficient coins");
        }

        // set Weekday Access
        await setWeekdayAccess(serverId, true);
        await registerAutostop(serverId, days);

        // remove coins
        await setCoins(user.id, coins - cost);

        revalidatePath("/");
    }
);
