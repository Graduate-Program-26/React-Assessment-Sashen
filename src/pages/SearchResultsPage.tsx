import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useSearchResults } from "@/hooks/useSearchResults";

const SKELETON_PLACEHOLDER_COUNT = 5;

export default function SearchResultsPage() {
    const {
        searchQuery,
        searchResults,
        isLoading,
        fetchNextPage,
        hasNextPage,
    } = useSearchResults();

    const hasNoResults = searchResults.length === 0 && !isLoading;
    const hasResults   = searchResults.length > 0;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="max-w-2xl mx-auto px-4 py-12 w-full">

                <Link to="/">
                    <Button variant="ghost" size="sm" className="mb-6 gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to search
                    </Button>
                </Link>

                <h1 className="text-lg font-semibold mb-6">
                    Results for &quot;{searchQuery}&quot;
                </h1>

                {isLoading && (
                    <div className="flex flex-col gap-3">
                        {Array.from({ length: SKELETON_PLACEHOLDER_COUNT }).map((_, skeletonIndex) => (
                            <Skeleton key={skeletonIndex} className="h-14 rounded-lg" />
                        ))}
                    </div>
                )}

                {hasNoResults && (
                    <p className="text-muted-foreground text-sm">
                        No users found for &quot;{searchQuery}&quot;
                    </p>
                )}

                {hasResults && searchResults.map((githubUser) => (
                    <Link key={githubUser.id} to={`/user/${githubUser.login}`}>
                        <div className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-muted transition-colors">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={githubUser.avatar_url} alt={githubUser.login} />
                                <AvatarFallback>{githubUser.login[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{githubUser.login}</span>
                        </div>
                    </Link>
                ))}

                {hasNextPage && (
                    <Button
                        variant="outline"
                        className="w-full mt-4"
                        onClick={() => fetchNextPage()}
                    >
                        Load more
                    </Button>
                )}

            </main>
        </div>
    );
}
