import * as Styled from "./Styled.InfomaticWidget";
import InfomaticWidgetContent from "src/component/main/widget/InfomaticWidget/InfomaticWidgetContent";
import Widget from "src/component/common/Widget";

export default function InfomaticWidget() {
	return (
		<Widget title='인포매틱스'>
			<Styled.Frame>
				<InfomaticWidgetContent />
			</Styled.Frame>
		</Widget>
	);
}
