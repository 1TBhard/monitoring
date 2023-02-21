import CustomLoading from "src/component/common/CustomLoading";
import ErrorWrapper from "src/component/common/ErrorWrapper";
import useAvgResponseTime from "src/hook/spot/useAvgResponseTime";
import UtilDate from "src/util/UtilDate";
import UtilNumber from "src/util/UtilNumber";
import { Area, AreaConfig } from "@ant-design/charts";
import { AVG_REPONSE_TIME_CHART_1_MIN_INTERVAL } from "src/const/STATISTICS";
import { LOAD_FAIL } from "src/const/MESSAGE";

export default function AvgResponseTimeAreaChart() {
	const { avgResponseTimeList, isError, isLoading } = useAvgResponseTime();

	const areaConfig: AreaConfig = {
		data: avgResponseTimeList,
		padding: "auto",
		xField: "date",
		yField: "value",
		isStack: false,
		animation: false,
		xAxis: {
			tickCount:
				avgResponseTimeList.length / AVG_REPONSE_TIME_CHART_1_MIN_INTERVAL,
			label: {
				formatter: (timeString: string) =>
					UtilDate.getHHmmFromTimeString(timeString),
			},

			type: "time",
			mask: "YYYY-MM-DD HH:mm:ss",
		},
		yAxis: {
			label: {
				formatter: (v) => `${UtilNumber.toLocaleString(v)}s`,
			},
		},

		tooltip: {
			formatter: (datum) => ({ name: `응답시간`, value: datum.value }),
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
