import { Badge } from "@/components/ui/badge";

interface Props {
    followers:   number;
    following:   number;
    publicRepos: number;
}

export default function ProfileStats({ followers, following, publicRepos }: Props) {
    return (
        <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary">{followers} followers</Badge>
            <Badge variant="secondary">{following} following</Badge>
            <Badge variant="secondary">{publicRepos} repos</Badge>
        </div>
    );
}
