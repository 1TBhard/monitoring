import getActiveUserByHour from "src/api/statistics/getActiveUserByHour";
import UtilDate from "src/util/UtilDate";
import { QUERY_COMMON } from "src/const/QUERY_CONST";
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
	const { data, isLoading } = useQuery({
		queryFn: () => getActiveUserByHour({ stime, etime }),
		queryKey: [QUERY_KEY.PROJECT, QUERY_KEY.ACTIVE_USER, stime, etime],
		staleTime: QUERY_COMMON.STALE_TIME,
		cacheTime: QUERY_COMMON.CACHE_TIME,
		retry: QUERY_COMMON.RETRY,
		retryDelay: QUERY_COMMON.RETRY_DELAY,
	});

	return {
		activeUserList:
			data?.data.map((d) => ({
				date: UtilDate.dateBumberToHHmm(d[0]),
				activeUser: d[1],
			})) ?? [],
		isLoading,
	};
}
