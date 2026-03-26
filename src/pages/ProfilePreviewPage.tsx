import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ArrowLeft, MapPin, Mail, CalendarDays, Clock } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";
import { fetchUser, fetchRepos, fetchLastActivity, countTopLanguages } from "@/api/github";

const FIVE_MINUTES_MS = 5 * 60 * 1000;

export default function ProfilePreviewPage() {
    const { username } = useParams<{ username: string }>();

    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const recentYears = Array.from({ length: 5 }, (_, yearOffset) => currentYear - yearOffset);

    // TanStack Query caches result, shows loading/error states
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

    let topLanguages: string[] = [];
    if (repos) {
        topLanguages = countTopLanguages(repos);
    }

    const { data: events } = useQuery({
        queryKey: ["events", username],
        queryFn: () => fetchLastActivity(username!),
        staleTime: FIVE_MINUTES_MS,
        enabled: !!username,
    });

    let lastContributed: string | null = null;
    if (events && events.length > 0) {
        lastContributed = new Date(events[0].created_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

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

                        <div className="flex items-center gap-4">
                            <Avatar className="w-16 h-16">
                                <AvatarImage src={user.avatar_url} alt={user.login} />
                                <AvatarFallback>{user.login[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-xl font-bold">{user.name || user.login}</h1>
                                <p className="text-muted-foreground text-sm">@{user.login}</p>
                            </div>
                        </div>

                        {user.bio && (
                            <p className="text-sm text-muted-foreground">{user.bio}</p>
                        )}

                        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                            {user.location && (
                                <span className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    {user.location}
                                </span>
                            )}
                            {user.email && (
                                <span className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    {user.email}
                                </span>
                            )}
                            <span className="flex items-center gap-2">
                                <CalendarDays className="w-4 h-4" />
                                Joined {new Date(user.created_at).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
                            </span>
                            {lastContributed && (
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Last active {lastContributed}
                                </span>
                            )}
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="secondary">{user.followers} followers</Badge>
                            <Badge variant="secondary">{user.following} following</Badge>
                            <Badge variant="secondary">{user.public_repos} repos</Badge>
                        </div>

                        {topLanguages.length > 0 && (
                            <div>
                                <h2 className="text-sm font-semibold mb-2">Top Languages</h2>
                                <div className="flex gap-2 flex-wrap">
                                    {topLanguages.map((language) => (
                                        <Badge key={language} variant="outline">{language}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-sm font-semibold">Contributions</h2>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                                    className="text-xs bg-background border border-border rounded px-2 py-1"
                                >
                                    {recentYears.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                            <GitHubCalendar
                                username={user.login}
                                year={selectedYear}
                                colorScheme="dark"
                                fontSize={12}
                            />
                        </div>

                    </div>
                )}

            </main>
        </div>
    );
}
