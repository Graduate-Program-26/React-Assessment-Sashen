import { Clock } from "lucide-react";
import type { GitHubEvent } from "@/api/github";

const eventLabel: Record<string, string> = {
    PushEvent:        "Pushed to",
    PullRequestEvent: "Opened PR in",
    IssuesEvent:      "Opened issue in",
    WatchEvent:       "Starred",
    ForkEvent:        "Forked",
    CreateEvent:      "Created",
    DeleteEvent:      "Deleted branch in",
};

interface Props {
    events: GitHubEvent[];
}

export default function RecentActivity({ events }: Props) {
    if (events.length === 0) return null;

    return (
        <div>
            <h2 className="text-sm font-semibold mb-3">Recent Activity</h2>
            <div className="flex flex-col divide-y divide-border">
                {events.map((event, index) => (
                    <div key={index} className="py-3 flex items-start gap-3 text-sm">
                        <Clock className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                        <div className="flex flex-col gap-0.5">
                            <span>
                                <span className="text-muted-foreground">
                                    {eventLabel[event.type] ?? event.type}
                                </span>{" "}
                                <span className="font-medium">{event.repo.name}</span>
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {new Date(event.created_at).toLocaleDateString("en-GB", {
                                    day: "numeric", month: "short", year: "numeric",
                                })}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
