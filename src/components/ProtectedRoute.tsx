import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const isAuthenticated = !!useAuthStore((store: ReturnType<typeof useAuthStore.getState>) => store.token);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }       

    return <>{children}</>;
}