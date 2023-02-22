import getSpot from "src/api/spot/getSpot";
import { QUERY_COMMON } from "src/const/QUERY_CONST";
import { QUERY_KEY } from "src/hook/store";
import { useQuery } from "@tanstack/react-query";

export type UseSpotReturn = ReturnType<typeof useSpot>;

export default function useSpot() {
	const { data, isError, isLoading } = useQuery({
		queryFn: () => {
			return getSpot().then((res) => ({
				act_agent: res.act_agent,
				inact_agent: res.inact_agent,
				cpucore: res.cpucore,
				host: res.host,
			}));
		},
		queryKey: [QUERY_KEY.PROJECT, QUERY_KEY.SPOT],
		staleTime: QUERY_COMMON.STALE_TIME,
		cacheTime: QUERY_COMMON.CACHE_TIME,
		retry: QUERY_COMMON.RETRY,
		retryDelay: QUERY_COMMON.RETRY_DELAY,
		refetchInterval: QUERY_COMMON.REFETCH_INTERVAL,
		notifyOnChangeProps: ["data", "error"],
	});

	const spotItemList = [
		{
			subTitle: "총 에이전트",
			Indicator: Number(data?.act_agent ?? 0) + Number(data?.inact_agent ?? 0),
		},
		{
			subTitle: "비활성화 에이전트",
			Indicator: data?.inact_agent ?? 0,
		},
		{
			subTitle: "CPU 코어",
			Indicator: data?.cpucore ?? 0,
		},
		{
			subTitle: "호스트",
			Indicator: data?.host ?? 0,
		},
	];

	return {
		spotItemList,
		isLoading,
		isError,
	};
}
