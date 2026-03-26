import { useSearchUsers } from "@/hooks/useSearchUsers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";

export default function SearchBar() {
    const {
        searchQuery,
        isDropdownOpen,
        searchResults,
        handleInputChange,
        handleKeyDown,
        handleSearch,
        navigateToProfile,
        navigateToSearchResults,
    } = useSearchUsers();

    const hasResults = isDropdownOpen && searchResults && searchResults.length > 0;

    return (
        <div className="relative w-full max-w-md">
            <div className="flex gap-2">
                <Input
                    placeholder="Enter a GitHub username..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="h-10"
                />
                <Button onClick={handleSearch} className="h-10 px-4">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                </Button>
            </div>

            {hasResults && (
                <div className="absolute top-12 w-full bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                    {searchResults.map((user) => (
                        <button
                            key={user.id}
                            onClick={() => navigateToProfile(user.login)}
                            className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-muted text-sm text-left"
                        >
                            <Avatar className="w-6 h-6">
                                <AvatarImage src={user.avatar_url} alt={user.login} />
                                <AvatarFallback>{user.login[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.login}</span>
                        </button>
                    ))}
                    <button
                        onClick={navigateToSearchResults}
                        className="flex items-center gap-2 w-full px-4 py-2.5 hover:bg-muted text-xs text-muted-foreground border-t border-border"
                    >
                        See all results for &quot;{searchQuery}&quot;
                    </button>
                </div>
            )}
        </div>
    );
}
