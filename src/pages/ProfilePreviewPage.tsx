import { useParams } from "react-router-dom";

export default function ProfilePreviewPage() {
    const { username } = useParams();
    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-muted-foreground">Profile: {username}</p>
        </div>
    )
}