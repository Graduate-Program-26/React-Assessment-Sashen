import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";

const GitHubUserSchema = z.object({
    login:        z.string(),
    name:         z.string().nullable(),
    avatar_url:   z.string(),
    bio:          z.string().nullable(),
    followers:    z.number(),
    following:    z.number(),
    public_repos: z.number(),
    html_url:     z.string(),
    location:     z.string().nullable(),
});

type GitHubUser = z.infer<typeof GitHubUserSchema>;

async function fetchUser(username: string): Promise<GitHubUser> {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error("User not found");
    return GitHubUserSchema.parse(await res.json());
}

export default function ProfilePreviewPage() {
    const { username } = useParams<{ username: string }>();

    // TanStack Query caches result, shows loading/error states
    const { data: user, isLoading, isError } = useQuery({
        queryKey: ["user", username],
        queryFn: () => fetchUser(username!),
        staleTime: 5 * 60 * 1000,
    });

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
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="secondary">{user.followers} followers</Badge>
                            <Badge variant="secondary">{user.following} following</Badge>
                            <Badge variant="secondary">{user.public_repos} repos</Badge>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
