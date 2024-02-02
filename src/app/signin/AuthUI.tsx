"use client";

import { useAuth } from "@/app/auth/auth_provider";
import { getURL } from "@/lib/utils";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { get } from "http";

export default function AuthUI() {
    const { client } = useAuth();

    return (
        <div className="flex flex-col space-y-4">
            <Auth
                supabaseClient={client}
                providers={["discord"]}
                redirectTo={`${getURL()}auth/callback`}
                appearance={{ theme: ThemeSupa }}
                theme="dark"
            />
        </div>
    );
}
