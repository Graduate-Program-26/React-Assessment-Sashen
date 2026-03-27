import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import CallbackPage from "@/pages/CallbackPage";
import ProfilePreviewPage from "@/pages/ProfilePreviewPage";
import SearchResultsPage from "@/pages/SearchResultsPage";
import DashboardPage from "@/pages/DashboardPage";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/callback" element={<CallbackPage />} />
                <Route path="/user/:username" element={<ProfilePreviewPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <DashboardPage />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}