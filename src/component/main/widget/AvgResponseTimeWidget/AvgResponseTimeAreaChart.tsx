import CustomLoading from "src/component/common/CustomLoading";
import ErrorWrapper from "src/component/common/ErrorWrapper";
import useAvgResponseTime from "src/hook/spot/useAvgResponseTime";
import UtilDate from "src/util/UtilDate";
import { Area, AreaConfig } from "@ant-design/charts";
import { AVG_RESPONSE_TIME_CAHRT } from "src/const/STATISTICS";
import { LOAD_FAIL } from "src/const/MESSAGE";

export default function AvgResponseTimeAreaChart() {
	const { avgResTimeList, isError, isLoading } = useAvgResponseTime();

	const areaConfig: AreaConfig = {
		data: avgResTimeList,
		padding: "auto",
		xField: "date",
		yField: "value",
		isStack: false,
		animation: false,
		xAxis: {
			tickCount:
				avgResTimeList.length / AVG_RESPONSE_TIME_CAHRT.DATA_NUMS_BY_1_MIN,
			label: {
				formatter: (timeString: string) =>
					UtilDate.getHHmmFromTimeString(timeString),
			},

			type: "time",
			mask: "YYYY-MM-DD HH:mm:ss",
		},
		yAxis: {
			label: {
				formatter: (ms) => UtilDate.msToSecString(ms),
			},
		},

		tooltip: {
			formatter: (datum) => ({
				name: "응답시간",
				value: UtilDate.msToSecString(datum.value),
			}),
		},
	};

	if (isError) {
		return (
			<ErrorWrapper errorMessage={LOAD_FAIL} isError={true}>
				<Area {...areaConfig} />
			</ErrorWrapper>
		);
	}

	return (
		<CustomLoading spinning={isLoading}>
			<Area {...areaConfig} />
		</CustomLoading>
	);
}
