import { MapPin, Mail, CalendarDays, Clock } from "lucide-react";

interface Props {
    location:        string | null;
    email:           string | null;
    createdAt:       string;
    lastContributed: string | null;
}

export default function ProfileDateLocation({ location, email, createdAt, lastContributed }: Props) {
    const joinedDate = new Date(createdAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" });

    return (
        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            {location && (
                <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {location}
                </span>
            )}
            {email && (
                <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {email}
                </span>
            )}
            <span className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                Joined {joinedDate}
            </span>
            {lastContributed && (
                <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Last active {lastContributed}
                </span>
            )}
        </div>
    );
}
