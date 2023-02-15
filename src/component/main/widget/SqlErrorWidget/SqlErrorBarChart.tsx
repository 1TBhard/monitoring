import { Bar, BarConfig } from "@ant-design/charts";
import SqlStatistics from "src/type/SqlStatistics";

interface SqlErrorBarChartProps {
	data: SqlStatistics[];
}

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

export default function SqlErrorBarChart({ data }: SqlErrorBarChartProps) {
	return <Bar {...barConfig} data={data} />;
}
