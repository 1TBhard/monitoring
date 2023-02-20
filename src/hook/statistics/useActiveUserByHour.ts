import getActiveUserByHour from "src/api/statistics/getActiveUserByHour";
import UtilDate from "src/util/UtilDate";
import { QUERY_BY_DAY, QUERY_BY_HOUR } from "src/const/QUERY_CONST";
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
	const {
		data: todayData,
		isLoading,
		isError,
	} = useQuery({
		queryFn: () => getActiveUserByHour({ stime, etime }),
		queryKey: [
			QUERY_KEY.PROJECT,
			QUERY_KEY.ACTIVE_USER,
			QUERY_KEY.TODAY,
			stime,
			etime,
		],
		staleTime: QUERY_BY_HOUR.STALE_TIME,
		cacheTime: QUERY_BY_HOUR.CACHE_TIME,
		retry: QUERY_BY_HOUR.RETRY,
		retryDelay: QUERY_BY_HOUR.RETRY_DELAY,
		refetchInterval: QUERY_BY_HOUR.REFETCH_INTERVAL,
		notifyOnChangeProps: ["data", "error"],
	});

	const {
		data: yesterdayData,
		isLoading: yesterdayIsLoading,
		isError: yesterdayIsError,
	} = useQuery({
		queryFn: () => {
			const { stime: yesterdayStime, etime: yesterdayEtime } =
				UtilDate.getYesterdayStimeEtime(stime);
			return getActiveUserByHour({
				stime: yesterdayStime,
				etime: yesterdayEtime,
			});
		},
		queryKey: [
			QUERY_KEY.PROJECT,
			QUERY_KEY.ACTIVE_USER,
			QUERY_KEY.YESTERDAY,
			stime,
			etime,
		],
		staleTime: QUERY_BY_DAY.STALE_TIME,
		cacheTime: QUERY_BY_DAY.CACHE_TIME,
		retry: QUERY_BY_DAY.RETRY,
		retryDelay: QUERY_BY_DAY.RETRY_DELAY,
		refetchInterval: QUERY_BY_DAY.REFETCH_INTERVAL,
		notifyOnChangeProps: ["data", "error"],
	});

	const activeUserList =
		todayData?.data
			.map((d) => ({
				date: UtilDate.dateBumberToHHmm(d[0]),
				activeUser: d[1],
				dayType: "오늘",
			}))
			.concat(
				yesterdayData?.data.map((d) => ({
					date: UtilDate.dateBumberToHHmm(d[0]),
					activeUser: d[1],
					dayType: "어제",
				})) ?? []
			) ?? [];

	return {
		activeUserList,
		isLoading: isLoading || yesterdayIsLoading,
		isError: isError || yesterdayIsError,
	};
}
