import TpsDescription from "src/component/main/widget/TpsWidget/TpsDescription";
import TpsAreaChart from "src/component/main/widget/TpsWidget/TpsAreaChart";
import Widget from "src/component/common/Widget";
import { WidgetDataContext } from "src/hook/WidgetDataProvider";

export default function TpsWidget() {
	return (
		<Widget
			title='TPS (Transactions Per Second)'
			description={<TpsDescription />}
		>
			<WidgetDataContext.Consumer>
				{(data) => (
					<TpsAreaChart
						tpsList={data.tpsList.data}
						state={data.tpsList.state}
					/>
				)}
			</WidgetDataContext.Consumer>
		</Widget>
	);
}
