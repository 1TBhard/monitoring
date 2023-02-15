import Widget from "src/component/common/Widget";
import InfomaticWidgetContent from "src/component/main/widget/InfomaticWidget/InfomaticWidgetContent";
import useSpot from "src/hook/spot/useSpot";
import * as Styled from "./Styled.InfomaticWidget";

export default function InfomaticWidget() {
	const { spotItemList, isLoading, isError } = useSpot();

	return (
		<Widget title='인포매틱스'>
			<Styled.Frame>
				<InfomaticWidgetContent
					spotItemList={spotItemList}
					isLoading={isLoading}
					isError={isError}
				/>
			</Styled.Frame>
		</Widget>
	);
}
