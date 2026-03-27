import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { fetchAuthRepos } from "@/api/github";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

const FIVE_MINUTES_STALE_TIME = 5 * 60 * 1000;
const LOADING_SKELETON_COUNT  = 6;
const MAX_REPOSITORIES_SHOWN  = 6;
const DEFAULT_LANGUAGE_COLOUR = "#888";

const languageColourMap: Record<string, string> = {
    TypeScript:  "#3178c6",
    JavaScript:  "#f7df1e",
    Python:      "#3572A5",
    "C#":        "#512bd4",
    Go:          "#00add8",
    Rust:        "#dea584",
};

export default function RepoGrid() {
    const userAuthToken = useAuthStore((store) => store.token);

    const { data: topRepositories, isLoading: isLoadingRepositories } = useQuery({
        queryKey:  ["dashboard-repos"],
        queryFn:   () => fetchAuthRepos(userAuthToken!),
        enabled:   !!userAuthToken,
        staleTime: FIVE_MINUTES_STALE_TIME,
    });

    return (
        <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Top repositories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {isLoadingRepositories
                    ? Array.from({ length: LOADING_SKELETON_COUNT }).map((_, skeletonIndex) => (
                        <Skeleton key={skeletonIndex} className="h-32 rounded-lg" />
                    ))
                    : topRepositories?.slice(0, MAX_REPOSITORIES_SHOWN).map((repository) => (
                        <Card key={repository.id}>
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between gap-2">
                                    <CardTitle className="text-sm font-semibold truncate">
                                        <a
                                            href={`https://github.com/${repository.full_name}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-400 hover:underline"
                                        >
                                            {repository.name}
                                        </a>
                                    </CardTitle>
                                    <Badge variant={repository.private ? "destructive" : "secondary"} className="text-xs shrink-0">
                                        {repository.private ? "Private" : "Public"}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                                    {repository.description ?? "No description"}
                                </p>
                                <div className="flex items-center gap-3">
                                    {repository.language && (
                                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <span
                                                className="w-2.5 h-2.5 rounded-full"
                                                style={{ background: languageColourMap[repository.language] ?? DEFAULT_LANGUAGE_COLOUR }}
                                            />
                                            {repository.language}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Star className="w-3 h-3" />
                                        {repository.stargazers_count}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
        </section>
    );
}
