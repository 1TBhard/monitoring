import TpsDescription from "src/component/main/widget/TpsWidget/TpsDescription";
import Widget from "src/component/common/Widget";
import TpsWidgetContent from "src/component/main/widget/TpsWidget/TpsWidgetContent";
import useTps from "src/hook/spot/useTps";

export default function TpsWidget() {
	const { tpsList, isError, isLoading } = useTps();

	return (
		<Widget
			title='TPS (Transactions Per Second)'
			description={<TpsDescription />}
		>
			<TpsWidgetContent
				tpsList={tpsList}
				isError={isError}
				isLoading={isLoading}
			/>
		</Widget>
	);
}
