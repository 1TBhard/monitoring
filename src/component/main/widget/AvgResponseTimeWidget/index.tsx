import Widget from "src/component/common/Widget";
import AvgResponseTimeDescription from "src/component/main/widget/AvgResponseTimeWidget/AvgResponseTimeDescription";
import AvgResponseTimeAreaChart from "src/component/main/widget/AvgResponseTimeWidget/AvgResponseTimeAreaChart";

export default function AvgResponseTimeWidget() {
	return (
		<Widget title='평균 응답시간' description={<AvgResponseTimeDescription />}>
			<AvgResponseTimeAreaChart />
		</Widget>
	);
}
