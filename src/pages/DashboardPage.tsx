import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { fetchAuthActivity } from "@/api/github";
import Navbar from "@/components/Navbar";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileDateLocation from "@/components/profile/ProfileDateLocation";
import ProfileStats from "@/components/profile/ProfileStats";
import ContributionCalendar from "@/components/profile/ContributionCalendar";
import RecentActivity from "@/components/profile/RecentActivity";
import RepoGrid from "@/components/dashboard/RepoGrid";
import { Button } from "@/components/ui/button";

const FIVE_MINUTES_MS = 5 * 60 * 1000;

export default function DashboardPage() {
    const { user, token, logout } = useAuthStore();
    const navigate = useNavigate();

    const { data: events } = useQuery({
        queryKey:  ["dashboard-events", user?.login],
        queryFn:   () => fetchAuthActivity(user!.login, token!),
        enabled:   !!user && !!token,
        staleTime: FIVE_MINUTES_MS,
    });

    const lastContributed = events && events.length > 0
        ? new Date(events[0].created_at).toLocaleDateString("en-GB", {
            day: "numeric", month: "long", year: "numeric",
        })
        : null;

    function handleLogout() {
        logout();
        navigate("/");
    }

    if (!user) return null;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 py-10 w-full">

                <div className="flex justify-end mb-6">
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                        Sign out
                    </Button>
                </div>

                <div className="flex flex-col gap-6">
                    <ProfileHeader
                        login={user.login}
                        name={user.name}
                        avatarUrl={user.avatar_url}
                        bio={user.bio}
                    />
                    <ProfileDateLocation
                        location={user.location}
                        email={user.email ?? null}
                        createdAt={user.created_at ?? ""}
                        lastContributed={lastContributed}
                    />
                    <ProfileStats
                        followers={user.followers}
                        following={user.following}
                        publicRepos={user.public_repos}
                    />
                    <RepoGrid />
                    {events && <RecentActivity events={events} />}
                    <ContributionCalendar username={user.login} />
                </div>

            </main>
        </div>
    );
}
