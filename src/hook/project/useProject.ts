import getProject from "src/api/project/getProject";
import { QUERY_KEY } from "src/hook/store";
import { QUERY_LONG_TERM } from "src/const/QUERY_CONST";
import { useQuery } from "@tanstack/react-query";

export default function useProject() {
	const { data, isLoading } = useQuery({
		queryFn: getProject,
		queryKey: [QUERY_KEY.PROJECT],
		// onSuccess: () => {
		// 	queryClient.invalidateQueries([QUERY_KEY.PROJECT]);
		// },
		staleTime: QUERY_LONG_TERM.STALE_TIME,
		cacheTime: QUERY_LONG_TERM.CACHE_TIME,
		retry: QUERY_LONG_TERM.RETRY,
		retryDelay: QUERY_LONG_TERM.RETRY_DELAY,
	});

	return {
		project: data?.data,
		projectName: data?.data.name ?? "없음",
		status: data?.data.status,
		platform: data?.data.platform,
		isLoading,
	};
}
