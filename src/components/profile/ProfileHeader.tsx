import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Props {
    login:     string;
    name:      string | null;
    avatarUrl: string;
    bio:       string | null;
}

export default function ProfileHeader({ login, name, avatarUrl, bio }: Props) {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                    <AvatarImage src={avatarUrl} alt={login} />
                    <AvatarFallback>{login[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-xl font-bold">{name || login}</h1>
                    <p className="text-muted-foreground text-sm">@{login}</p>
                </div>
            </div>
            {bio && <p className="text-sm text-muted-foreground">{bio}</p>}
        </div>
    );
}
