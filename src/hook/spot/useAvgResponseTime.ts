import getAvgReponseTime from "src/api/statistics/getAvgReponseTime";
import UtilDate from "src/util/UtilDate";
import {
	AVG_RESPONSE_TIME_CAHRT,
	CALL_BIAS_SECONDS,
} from "src/const/STATISTICS";
import { QUERY_COMMON } from "src/const/QUERY_CONST";
import { QUERY_KEY, queryClient } from "src/hook/store";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export default function useAvgResponseTime() {
	const getInitData = async () => {
		const currentDate = dayjs().add(CALL_BIAS_SECONDS, "seconds").toDate();

		const closeDateBySec = UtilDate.getCloseIntervalSecDate(
			currentDate,
			AVG_RESPONSE_TIME_CAHRT.INTERVAL_SEC
		);
		const startDate = UtilDate.getDateBeforeMinutes(closeDateBySec, 1);

		const timeList = UtilDate.getStimeEtimeBySecInterval(
			startDate,
			closeDateBySec,
			AVG_RESPONSE_TIME_CAHRT.INTERVAL_SEC
		);

		return Promise.all(
			timeList.map(({ stime, etime }) =>
				getAvgReponseTime({ stime, etime }).then((value) => ({
					date: new Date(stime),
					value,
				}))
			)
		);
	};

	const { data, isLoading, isError } = useQuery({
		queryKey: [QUERY_KEY.PROJECT, QUERY_KEY.SPOT, QUERY_KEY.AVG_RESPONSE_TIME],
		queryFn: async () => {
			const prevData = queryClient.getQueryData([
				QUERY_KEY.PROJECT,
				QUERY_KEY.SPOT,
				QUERY_KEY.AVG_RESPONSE_TIME,
			]) as { date: Date; value: number }[];

			let dataList;

			if (prevData.length === 0) {
				dataList = await getInitData();
			} else {
				dataList = prevData;
			}

			const lastItem = dataList[dataList.length - 1];
			const lastTime = lastItem.date;

			const nextStime = dayjs(lastTime).add(5, "seconds");
			const nextEtime = dayjs(nextStime).add(5, "seconds");

			const res = await getAvgReponseTime({
				stime: nextStime.toDate().getTime(),
				etime: nextEtime.toDate().getTime(),
			});

			const nextDataList = [
				...dataList,
				{ date: nextStime.toDate(), value: res },
			];

			return nextDataList.slice(
				AVG_RESPONSE_TIME_CAHRT.MAX_DATA_NUMBER < nextDataList.length
					? nextDataList.length - AVG_RESPONSE_TIME_CAHRT.MAX_DATA_NUMBER
					: 0,
				nextDataList.length
			);
		},

		staleTime: QUERY_COMMON.STALE_TIME,
		refetchInterval: QUERY_COMMON.REFETCH_INTERVAL,
		retry: QUERY_COMMON.RETRY,
		cacheTime: QUERY_COMMON.CACHE_TIME,
		keepPreviousData: true,
		refetchIntervalInBackground: true,
		initialData: [],
	});

	return { avgResTimeList: data ?? [], isLoading, isError };
}
