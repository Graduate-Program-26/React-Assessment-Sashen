import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CallbackPage() {
    const navigate = useNavigate();

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

        // TODO: exchange code for token via backend
        console.log("OAuth code received:", code);
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Signing you in...</p>
        </div>
    );
}