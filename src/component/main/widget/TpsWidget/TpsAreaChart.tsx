import CustomLoading from "src/component/common/CustomLoading";
import DateStatics from "src/type/DateStatics";
import ErrorWrapper from "src/component/common/ErrorWrapper";
import LoadingState from "src/type/LoadingState";
import UtilDate from "src/util/UtilDate";
import UtilList from "src/util/UtilList";
import { Area, AreaConfig } from "@ant-design/charts";
import { LOAD_FAIL } from "src/const/MESSAGE";
import { memo } from "react";
import { TPS_CAHRT } from "src/const/STATISTICS";

interface TpsAreaChartProps {
	tpsList: DateStatics<number>[];
	state: LoadingState;
}

function TpsAreaChart({ tpsList, state }: TpsAreaChartProps) {
	const isLoading = state === "init";
	const isError = state === "error";

	const areaConfig: AreaConfig = {
		data: tpsList,
		padding: "auto",
		xField: "date",
		yField: "value",
		isStack: false,
		animation: false,
		xAxis: {
			tickCount: tpsList.length / TPS_CAHRT.DATA_NUMS_BY_1_MIN,
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

export default memo(TpsAreaChart, (prevProps, nextProps) => {
	return (
		UtilList.isEqual(prevProps.tpsList, nextProps.tpsList) &&
		prevProps.state === nextProps.state
	);
});
