import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";
import { fetchUser, fetchRepos, fetchLastActivity, countTopLanguages } from "@/api/github";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileDateLocation from "@/components/profile/ProfileDateLocation";
import ProfileStats from "@/components/profile/ProfileStats";
import TopLanguages from "@/components/profile/TopLanguages";
import ContributionCalendar from "@/components/profile/ContributionCalendar";
import RecentActivity from "@/components/profile/RecentActivity";

const FIVE_MINUTES_MS = 5 * 60 * 1000;

export default function ProfilePreviewPage() {
    const { username } = useParams<{ username: string }>();

    const { data: user, isLoading, isError } = useQuery({
        queryKey: ["user", username],
        queryFn: () => fetchUser(username!),
        staleTime: FIVE_MINUTES_MS,
    });

    const { data: repos } = useQuery({
        queryKey: ["repos", username],
        queryFn: () => fetchRepos(username!),
        staleTime: FIVE_MINUTES_MS,
        enabled: !!username,
    });

    const { data: events } = useQuery({
        queryKey: ["events", username],
        queryFn: () => fetchLastActivity(username!),
        staleTime: FIVE_MINUTES_MS,
        enabled: !!username,
    });

    const topLanguages = repos ? countTopLanguages(repos) : [];

    const lastContributed = events && events.length > 0
        ? new Date(events[0].created_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : null;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="max-w-2xl mx-auto px-4 py-12 w-full">

                <Link to="/">
                    <Button variant="ghost" size="sm" className="mb-6 gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to search
                    </Button>
                </Link>

                {isLoading && (
                    <div className="flex gap-4 items-center">
                        <Skeleton className="w-16 h-16 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-4 w-60" />
                        </div>
                    </div>
                )}

                {isError && (
                    <p className="text-destructive">
                        User &quot;{username}&quot; not found.
                    </p>
                )}

                {user && (
                    <div className="flex flex-col gap-6">
                        <ProfileHeader
                            login={user.login}
                            name={user.name}
                            avatarUrl={user.avatar_url}
                            bio={user.bio}
                        />
                        <ProfileDateLocation
                            location={user.location}
                            email={user.email}
                            createdAt={user.created_at}
                            lastContributed={lastContributed}
                        />
                        <ProfileStats
                            followers={user.followers}
                            following={user.following}
                            publicRepos={user.public_repos}
                        />
                        <TopLanguages languages={topLanguages} />
                        {events && <RecentActivity events={events} />}
                        <ContributionCalendar username={user.login} />
                    </div>
                )}

            </main>
        </div>
    );
}
