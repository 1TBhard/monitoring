import Widget from "src/component/common/Widget";
import AvgResponseTimeDescription from "src/component/main/widget/AvgResponseTimeWidget/AvgResponseTimeDescription";
import AvgResponseTimeAreaChart from "src/component/main/widget/AvgResponseTimeWidget/AvgResponseTimeAreaChart";
import { WidgetDataContext } from "src/hook/WidgetDataProvider";

export default function AvgResponseTimeWidget() {
	return (
		<Widget title='평균 응답시간' description={<AvgResponseTimeDescription />}>
			<WidgetDataContext.Consumer>
				{(data) => (
					<AvgResponseTimeAreaChart
						avgResTimeList={data.avgResTimeList.data}
						state={data.avgResTimeList.state}
					/>
				)}
			</WidgetDataContext.Consumer>
		</Widget>
	);
}
