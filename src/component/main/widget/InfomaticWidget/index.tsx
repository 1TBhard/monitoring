import InfomaticWidgetContent from "src/component/main/widget/InfomaticWidget/InfomaticWidgetContent";
import Widget from "src/component/common/Widget";
import { WidgetDataContext } from "src/hook/WidgetDataProvider";
import * as Styled from "./Styled.InfomaticWidget";

export default function InfomaticWidget() {
	return (
		<Widget title='인포매틱스'>
			<Styled.Frame>
				<WidgetDataContext.Consumer>
					{(widgetData) => (
						<InfomaticWidgetContent
							spotItemList={widgetData.spotItemList.data}
							state={widgetData.spotItemList.state}
						/>
					)}
				</WidgetDataContext.Consumer>
			</Styled.Frame>
		</Widget>
	);
}
