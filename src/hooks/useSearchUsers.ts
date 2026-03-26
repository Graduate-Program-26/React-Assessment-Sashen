import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { searchUsers } from "@/api/github";

const DEBOUNCE_DELAY_MS = 300;
const MIN_QUERY_LENGTH  = 2;

export function useSearchUsers() {
    const [searchQuery, setSearchQuery]       = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate                            = useNavigate();

    const [debouncedQuery] = useDebounce(searchQuery, DEBOUNCE_DELAY_MS);

    const { data: searchResults } = useQuery({
        queryKey: ["search", debouncedQuery],
        queryFn:  () => searchUsers(debouncedQuery),
        enabled:  debouncedQuery.length > MIN_QUERY_LENGTH,
    });

    function navigateToProfile(username: string) {
        setIsDropdownOpen(false);
        navigate(`/user/${username}`);
    }

    function navigateToSearchResults() {
        setIsDropdownOpen(false);
        navigate(`/search?q=${searchQuery}`);
    }

    function handleSearch() {
        const trimmedQuery = searchQuery.trim();
        if (!trimmedQuery) return;
        navigateToProfile(trimmedQuery);
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchQuery(e.target.value);
        setIsDropdownOpen(true);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") handleSearch();
    }

    return {
        searchQuery,
        isDropdownOpen,
        searchResults,
        handleInputChange,
        handleKeyDown,
        handleSearch,
        navigateToProfile,
        navigateToSearchResults,
    };
}
