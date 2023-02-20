import dayjs from "dayjs";
import getAvgReponseTime from "src/api/spot/getAvgReponseTime";
import UtilDate from "src/util/UtilDate";
import UtilLocalstorageAvgResponseTime from "src/util/UtilLocalstorageAvgResponseTime";
import { QUERY_COMMON } from "src/const/QUERY_CONST";
import { QUERY_KEY } from "src/hook/store";
import { useQuery } from "@tanstack/react-query";

export type UseAvgResponseTimeReturn = ReturnType<typeof useAvgResponseTime>;

const INTERVAL_SEC = QUERY_COMMON.REFETCH_INTERVAL / 1000;

export default function useAvgResponseTime() {
	const { data, isError, isLoading } = useQuery({
		queryFn: () => {
			return getAvgReponseTime().then((value) => {
				const localCacheData = UtilLocalstorageAvgResponseTime.get();

				const lastItem = localCacheData[localCacheData.length - 1];
				const lastItemDate = lastItem ? new Date(lastItem.date) : new Date();
				const nextDate = dayjs(lastItemDate)
					.add(INTERVAL_SEC, "seconds")
					.toDate();

				const newLocalCacheData = {
					value: Math.round(value / 10) / 100,
					date: UtilDate.getCloseIntervalSecDate(nextDate, INTERVAL_SEC),
				};

				UtilLocalstorageAvgResponseTime.add(newLocalCacheData);

				return [...localCacheData, newLocalCacheData];
			});
		},

		queryKey: [QUERY_KEY.PROJECT, QUERY_KEY.SPOT, QUERY_KEY.AVG_RESPONSE_TIME],
		staleTime: QUERY_COMMON.STALE_TIME,
		cacheTime: QUERY_COMMON.CACHE_TIME,
		retry: QUERY_COMMON.RETRY,
		retryDelay: QUERY_COMMON.RETRY_DELAY,
		refetchInterval: QUERY_COMMON.REFETCH_INTERVAL,
		refetchIntervalInBackground: true,
	});

	return {
		avgResponseTimeList: data ?? [],
		isLoading,
		isError,
	};
}
