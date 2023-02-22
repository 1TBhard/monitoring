import CustomLoading from "src/component/common/CustomLoading";
import ErrorWrapper from "src/component/common/ErrorWrapper";
import useTps from "src/hook/spot/useTps";
import UtilDate from "src/util/UtilDate";
import { Area, AreaConfig } from "@ant-design/charts";
import { LOAD_FAIL } from "src/const/MESSAGE";
import { TPS_CAHRT_1_MIN_INTERVAL } from "src/const/STATISTICS";

export default function TpsAreaChart() {
	const { tpsList, isError, isLoading } = useTps();

	const areaConfig: AreaConfig = {
		data: tpsList,
		padding: "auto",
		xField: "date",
		yField: "value",
		isStack: false,
		animation: false,
		xAxis: {
			tickCount: tpsList.length / TPS_CAHRT_1_MIN_INTERVAL,
			label: {
				formatter: (timeString: string) =>
					UtilDate.getHHmmFromTimeString(timeString),
			},
			type: "time",
			mask: "YYYY-MM-DD HH:mm:ss",
		},
		yAxis: {
			label: {
				formatter: (v) => UtilDate.msToSecString(Number(v) * 1000),
			},
		},
		tooltip: {
			formatter: (datum) => ({
				name: "TPS",
				value: `${UtilDate.msToSecString(datum.value * 1000)}`,
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
