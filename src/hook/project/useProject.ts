import { useQuery } from "@tanstack/react-query";
import getProject from "src/api/project/getProject";
import { QUERY_LONG_TERM } from "src/const/QUERY_CONST";
import { QUERY_KEY } from "src/hook/store";

export default function useProject() {
	const { data, isLoading } = useQuery({
		queryFn: getProject,
		queryKey: [QUERY_KEY.PROJECT],
		staleTime: QUERY_LONG_TERM.STALE_TIME,
		cacheTime: QUERY_LONG_TERM.CACHE_TIME,
		retry: QUERY_LONG_TERM.RETRY,
		retryDelay: QUERY_LONG_TERM.RETRY_DELAY,
	});

	return {
		project: data,
		projectName: data?.name ?? "없음",
		status: data?.status,
		platform: data?.platform,
		isLoading,
	};
}
