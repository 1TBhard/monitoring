import getActiveUserByHour from "src/api/statistics/getActiveUserByHour";
import UtilDate from "src/util/UtilDate";
import { QUERY_BY_HOUR } from "src/const/QUERY_CONST";
import { QUERY_KEY } from "src/hook/store";
import { useQuery } from "@tanstack/react-query";

interface UseActiveUserByHourParams {
	stime: number;
	etime: number;
}

export default function useActiveUserByHour({
	stime,
	etime,
}: UseActiveUserByHourParams) {
	const { data, isLoading, isError } = useQuery({
		queryFn: () => getActiveUserByHour({ stime, etime }),
		queryKey: [QUERY_KEY.PROJECT, QUERY_KEY.ACTIVE_USER, stime, etime],
		staleTime: QUERY_BY_HOUR.STALE_TIME,
		cacheTime: QUERY_BY_HOUR.CACHE_TIME,
		retry: QUERY_BY_HOUR.RETRY,
		retryDelay: QUERY_BY_HOUR.RETRY_DELAY,
		refetchInterval: QUERY_BY_HOUR.REFETCH_INTERVAL,
		notifyOnChangeProps: ["data", "error"],
	});

	return {
		activeUserList:
			data?.data.map((d) => ({
				date: UtilDate.dateBumberToHHmm(d[0]),
				activeUser: d[1],
			})) ?? [],
		isLoading,
		isError,
	};
}
