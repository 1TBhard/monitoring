import Widget from "src/component/common/Widget";
import ActiveUserWidgetContent from "src/component/main/widget/ActiveUserWidget/ActiveUserWidgetContent";
import { WidgetDataContext } from "src/hook/WidgetDataProvider";

export default function ActiveUserWidget() {
	return (
		<Widget title='금일 사용자'>
			<WidgetDataContext.Consumer>
				{(data) => (
					<ActiveUserWidgetContent
						todayActiveUserList={data.todayActiveUserList}
						yesaterdayActiveUserList={data.yesaterdayActiveUserList}
					/>
				)}
			</WidgetDataContext.Consumer>
		</Widget>
	);
}
