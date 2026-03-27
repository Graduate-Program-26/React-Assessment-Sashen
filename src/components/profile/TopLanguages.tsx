import { Badge } from "@/components/ui/badge";

interface Props {
    languages: string[];
}

export default function TopLanguages({ languages }: Props) {
    if (languages.length === 0) return null;

    return (
        <div>
            <h2 className="text-sm font-semibold mb-2">Top Languages</h2>
            <div className="flex gap-2 flex-wrap">
                {languages.map((language) => (
                    <Badge key={language} variant="outline">{language}</Badge>
                ))}
            </div>
        </div>
    );
}
