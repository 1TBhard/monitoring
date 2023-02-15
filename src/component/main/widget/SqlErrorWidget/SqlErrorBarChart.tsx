import { Bar, BarConfig } from "@ant-design/charts";
import { memo } from "react";
import CustomLoading from "src/component/common/CustomLoading";
import { LOAD_FAIL, NO_DATA } from "src/const/MESSAGE";
import SqlStatistics from "src/type/SqlStatistics";
import UtilList from "src/util/UtilList";

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
	data: SqlStatistics[];
	isError: boolean;
	isLoading: boolean;
}

function SqlErrorBarChart({ data, isError, isLoading }: SqlErrorBarChartProps) {
	if (isError) {
		return <>{LOAD_FAIL}</>;
	}

	if (data.length === 0) {
		return <>{NO_DATA}</>;
	}

	return (
		<CustomLoading spinning={isLoading}>
			<Bar {...barConfig} data={data} />
		</CustomLoading>
	);
}

export default memo(SqlErrorBarChart, (prevProps, nextProps) => {
	return (
		prevProps.isLoading === nextProps.isLoading &&
		prevProps.isError === nextProps.isError &&
		UtilList.isEqual(prevProps.data, nextProps.data)
	);
});
