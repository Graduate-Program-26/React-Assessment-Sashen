import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchUsers } from "@/api/github";
import type { SearchUser } from "@/api/github";

const RESULTS_PER_PAGE = 5;

export function useSearchResults() {
    const [searchParams] = useSearchParams();
    const searchQuery    = searchParams.get("q") ?? "";

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ["search-results", searchQuery],
        queryFn: ({ pageParam }: { pageParam: number }) =>
            searchUsers(searchQuery, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage: SearchUser[], _allPages: SearchUser[][], lastPageParam: number) =>
            lastPage?.length === RESULTS_PER_PAGE ? lastPageParam + 1 : undefined,
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
