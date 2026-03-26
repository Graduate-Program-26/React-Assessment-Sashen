import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchUsers } from "@/api/github";

export function useSearchResults() {
    const [searchParams]  = useSearchParams();
    const searchQuery = searchParams.get("q") ?? "";

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
    } = useInfiniteQuery({
        queryKey:["search", searchQuery],
        queryFn: ({ pageParam }) => searchUsers(searchQuery, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPageResults, allPages) =>
            lastPageResults.length === 5 ? allPages.length + 1 : undefined,
        enabled: searchQuery.length > 0,
    });

    const searchResults = data?.pages.flat() ?? [];

    return {
        searchQuery,
        searchResults,
        isLoading,
        fetchNextPage,
        hasNextPage,
    };
}
