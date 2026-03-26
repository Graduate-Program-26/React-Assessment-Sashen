import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { GitHubUserSchema } from "@/api/github";
import { z } from "zod";

// Schema for the token response from our serverless function
const TokenSchema = z.object({
    access_token: z.string(),
});

export default function CallbackPage() {
    const navigate = useNavigate();
    const { setToken, setUser } = useAuthStore();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const state = params.get("state");
        const savedState = sessionStorage.getItem("oauth_state");

        // Reject the callback if state doesn't match — possible CSRF attack
        if (!state || state !== savedState) {
            navigate("/");
            return;
        }

        sessionStorage.removeItem("oauth_state");

        if (!code) {
            navigate("/");
            return;
        }

        async function exchangeCode() {
            try {
                // Call our Vercel serverless function
                const res = await fetch(`/api/callback?code=${code}`);
                const data = TokenSchema.parse(await res.json());

                setToken(data.access_token);

                // Fetch the authenticated user profile
                const userRes = await fetch("https://api.github.com/user", {
                    headers: { "Authorization": `Bearer ${data.access_token}` },
                });
                const user = GitHubUserSchema.parse(await userRes.json());
                setUser(user);
                navigate("/dashboard");

            } catch {
                navigate("/");
            }
        }

        exchangeCode();
    }, [navigate, setToken, setUser]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-muted-foreground text-sm animate-pulse">
                Signing you in...
            </p>
        </div>
    );
}