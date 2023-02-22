import CustomLoading from "src/component/common/CustomLoading";
import useSqlStatistics from "src/hook/statistics/useSqlStatistics";
import UtilDate from "src/util/UtilDate";
import { Bar, BarConfig } from "@ant-design/charts";
import { LOAD_FAIL, NO_DATA } from "src/const/MESSAGE";

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

export default function SqlErrorBarChart() {
	const { stime, etime } = UtilDate.getTodayStimeEtime();
	const { sqlStatistics, isLoading, isError } = useSqlStatistics({
		stime,
		etime,
	});

	if (isError) {
		return <>{LOAD_FAIL}</>;
	}

	if (sqlStatistics.length === 0) {
		return <>{NO_DATA}</>;
	}

	return (
		<CustomLoading spinning={isLoading}>
			<Bar {...barConfig} data={sqlStatistics} />
		</CustomLoading>
	);
}
