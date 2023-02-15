import getSpot from "src/api/spot/getSpot";
import { QUERY_COMMON } from "src/const/QUERY_CONST";
import { QUERY_KEY } from "src/hook/store";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { InfomaticWidgetProps } from "src/component/main/widget/InfomaticWidget";

export default function useSpot() {
	const { data, isLoading } = useQuery({
		queryFn: getSpot,
		queryKey: [QUERY_KEY.PROJECT, QUERY_KEY.SPOT],
		staleTime: QUERY_COMMON.STALE_TIME,
		cacheTime: QUERY_COMMON.CACHE_TIME,
		retry: QUERY_COMMON.RETRY,
		retryDelay: QUERY_COMMON.RETRY_DELAY,
	});

	const spotItemList = useMemo<InfomaticWidgetProps["itemList"]>(
		() => [
			{
				subTitle: "총 에이전트",
				Indicator:
					Number(data?.act_agent ?? 0) + Number(data?.inact_agent ?? 0),
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
		],
		[data]
	);

	return {
		spot: data,
		spotItemList,
		isLoading,
	};
}
