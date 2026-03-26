import { z } from "zod";

export const GitHubUserSchema = z.object({
    login:        z.string(),
    name:         z.string().nullable(),
    avatar_url:   z.string(),
    bio:          z.string().nullable(),
    followers:    z.number(),
    following:    z.number(),
    public_repos: z.number(),
    html_url:     z.string(),
    location:     z.string().nullable(),
    email:        z.string().nullable(),
    created_at:   z.string(),
});

export type GitHubUser = z.infer<typeof GitHubUserSchema>;

const RepoSchema = z.object({
    language: z.string().nullable(),
});

const RepoListSchema = z.array(RepoSchema);

export const EventSchema = z.object({
    type:       z.string(),
    created_at: z.string(),
    repo:       z.object({ name: z.string() }),
});

export type GitHubEvent = z.infer<typeof EventSchema>;

const EventListSchema = z.array(EventSchema);

export async function fetchUser(username: string): Promise<GitHubUser> {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error("User not found");
    return GitHubUserSchema.parse(await res.json());
}

export async function fetchRepos(username: string) {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=10`);
    if (!res.ok) throw new Error("Could not fetch repos");
    return RepoListSchema.parse(await res.json());
}

export async function fetchLastActivity(username: string) {
    const res = await fetch(`https://api.github.com/users/${username}/events?per_page=10`);
    if (!res.ok) throw new Error("Could not fetch activity.");
    return EventListSchema.parse(await res.json());
}

const DashboardRepoSchema = z.object({
    id:               z.number(),
    name:             z.string(),
    full_name:        z.string(),
    description:      z.string().nullable(),
    language:         z.string().nullable(),
    stargazers_count: z.number(),
    private:          z.boolean(),
});

export type DashboardRepo = z.infer<typeof DashboardRepoSchema>;
const DashboardRepoListSchema = z.array(DashboardRepoSchema);

export async function fetchAuthRepos(token: string) {
    const res = await fetch(
        "https://api.github.com/user/repos?sort=stars&per_page=6",
        { headers: { "Authorization": `Bearer ${token}` } }
    );
    if (!res.ok) throw new Error("Could not fetch repos");
    return DashboardRepoListSchema.parse(await res.json());
}

export async function fetchAuthActivity(username: string, token: string) {
    const res = await fetch(
        `https://api.github.com/users/${username}/events?per_page=10`,
        { headers: { "Authorization": `Bearer ${token}` } }
    );
    if (!res.ok) throw new Error("Could not fetch activity");
    return EventListSchema.parse(await res.json());
}

export function countTopLanguages(repos: { language: string | null }[]): string[] {
    const languageCounts: Record<string, number> = {};

    for (const repo of repos) {
        if (repo.language) {
            languageCounts[repo.language] = (languageCounts[repo.language] ?? 0) + 1;
        }
    }

    return Object.entries(languageCounts)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 5)
        .map(([language]) => language);
}
