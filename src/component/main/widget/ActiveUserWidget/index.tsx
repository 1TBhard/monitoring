import Widget from "src/component/common/Widget";
import ActiveUserWidgetContent from "src/component/main/widget/ActiveUserWidget/ActiveUserWidgetContent";

export default function ActiveUserWidget() {
	return (
		<Widget title='금일 사용자'>
			<ActiveUserWidgetContent />
		</Widget>
	);
}
