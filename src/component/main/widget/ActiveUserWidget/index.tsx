import { Line, LineConfig } from "@ant-design/charts";
import Widget from "src/component/common/Widget";
import useActiveUserByHour from "src/hook/statistics/useActiveUserByHour";

interface ActiveUserWidgetProps {
	activeUserList: ReturnType<typeof useActiveUserByHour>["activeUserList"];
}

export default function ActiveUserWidget({
	activeUserList,
}: ActiveUserWidgetProps) {
	const config: LineConfig = {
		data: activeUserList,
		padding: "auto",
		xField: "date",
		yField: "activeUser",
		xAxis: {
			tickCount: activeUserList.length,
		},
	};

	return (
		<Widget title='금일 사용자'>
			<Line {...config} />
		</Widget>
	);
}
