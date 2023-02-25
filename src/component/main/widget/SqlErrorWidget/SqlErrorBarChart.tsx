import CustomLoading from "src/component/common/CustomLoading";
import SqlStatistics from "src/type/SqlStatistics";
import { Bar, BarConfig } from "@ant-design/charts";
import { LOAD_FAIL, NO_DATA } from "src/const/MESSAGE";
import LoadingState from "src/type/LoadingState";

const barConfig: Omit<BarConfig, "data"> = {
	xField: "count_error",
	yField: "service",
	seriesField: "service",
	color: ["#f25022"],
	legend: false,
	tooltip: {
		title: "발생한 에러 건수",
	},
	animation: false,
	interactions: [{ type: "element-highlight" }, { type: "hover-cursor" }],
};

interface SqlErrorBarChartProps {
	sqlStatistics: SqlStatistics[];
	state: LoadingState;
}

export default function SqlErrorBarChart({
	sqlStatistics,
	state,
}: SqlErrorBarChartProps) {
	if (state === "error") {
		return <>{LOAD_FAIL}</>;
	}

	if (sqlStatistics.length === 0) {
		return <>{NO_DATA}</>;
	}

	return (
		<CustomLoading spinning={state === "loading"}>
			<Bar {...barConfig} data={sqlStatistics} />
		</CustomLoading>
	);
}
