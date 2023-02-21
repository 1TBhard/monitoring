import DateStatics from "src/type/DateStatics";
import dayjs from "dayjs";
import getTps from "src/api/spot/getTps";
import UtilDate from "src/util/UtilDate";
import { QUERY_COMMON } from "src/const/QUERY_CONST";
import { QUERY_KEY } from "src/hook/store";
import { TPS_CHART_MAX_DATA_NUMBER } from "src/const/STATISTICS";
import { useQuery } from "@tanstack/react-query";

const INTERVAL_SEC = QUERY_COMMON.REFETCH_INTERVAL / 1000;

const localCacheData: DateStatics<number>[] = [];

export default function useTps() {
	const { data, isError, isLoading } = useQuery({
		queryFn: () => {
			return getTps().then((value) => {
				const lastItem = localCacheData[localCacheData.length - 1];
				const lastItemDate = lastItem ? new Date(lastItem.date) : new Date();

				let nextDate = dayjs(lastItemDate)
					.add(INTERVAL_SEC, "seconds")
					.toDate();

				const newLocalCacheData = {
					value,
					date: UtilDate.getCloseIntervalSecDate(nextDate, INTERVAL_SEC),
				};

				localCacheData.push(newLocalCacheData);

				const sliceNums =
					localCacheData.length > TPS_CHART_MAX_DATA_NUMBER
						? localCacheData.length - TPS_CHART_MAX_DATA_NUMBER
						: 0;

				localCacheData.splice(0, sliceNums);

				return localCacheData;
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
