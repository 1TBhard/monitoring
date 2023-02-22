import TpsDescription from "src/component/main/widget/TpsWidget/TpsDescription";
import TpsAreaChart from "src/component/main/widget/TpsWidget/TpsAreaChart";
import Widget from "src/component/common/Widget";

export default function TpsWidget() {
	return (
		<Widget
			title='TPS (Transactions Per Second)'
			description={<TpsDescription />}
		>
			<TpsAreaChart />
		</Widget>
	);
}
