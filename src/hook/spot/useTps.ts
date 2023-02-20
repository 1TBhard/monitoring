import { QUERY_COMMON } from "src/const/QUERY_CONST";
import { QUERY_KEY } from "src/hook/store";
import { useQuery } from "@tanstack/react-query";
import UtilDate from "src/util/UtilDate";
import getTps from "src/api/spot/getTps";
import dayjs from "dayjs";
import UtilLocalstoragetTps from "src/util/UtilLocalstoragetTps";

export type UseTpsReturn = ReturnType<typeof useTps>;

const INTERVAL_SEC = QUERY_COMMON.REFETCH_INTERVAL / 1000;

export default function useTps() {
	const { data, isError, isLoading } = useQuery({
		queryFn: () => {
			return getTps().then((value) => {
				const localCacheData = UtilLocalstoragetTps.get();

				const lastItem = localCacheData[localCacheData.length - 1];
				const lastItemDate = lastItem ? new Date(lastItem.date) : new Date();
				const nextDate = dayjs(lastItemDate)
					.add(INTERVAL_SEC, "seconds")
					.toDate();

				const newLocalCacheData = {
					value,
					date: UtilDate.getCloseIntervalSecDate(nextDate, INTERVAL_SEC),
				};

				UtilLocalstoragetTps.add(newLocalCacheData);

				return [...localCacheData, newLocalCacheData];
			});
		},

		queryKey: [QUERY_KEY.PROJECT, QUERY_KEY.SPOT, QUERY_KEY.TPS],
		staleTime: QUERY_COMMON.STALE_TIME,
		cacheTime: QUERY_COMMON.CACHE_TIME,
		retry: QUERY_COMMON.RETRY,
		retryDelay: QUERY_COMMON.RETRY_DELAY,
		refetchInterval: QUERY_COMMON.REFETCH_INTERVAL,
		refetchIntervalInBackground: true,
	});

	return {
		tpsList: data ?? [],
		isLoading,
		isError,
	};
}
