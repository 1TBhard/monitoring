import useActiveUserByHour from "src/hook/statistics/useActiveUserByHour";
import UtilDate from "src/util/UtilDate";
import Widget from "src/component/common/Widget";
import ActiveUserWidgetContent from "src/component/main/widget/ActiveUserWidget/ActiveUserWidgetContent";

export default function ActiveUserWidget() {
	const { stime, etime } = UtilDate.getTodayStimeEtime();
	const { activeUserList, isLoading, isError } = useActiveUserByHour({
		stime,
		etime,
	});

	return (
		<Widget title='금일 사용자'>
			<ActiveUserWidgetContent
				activeUserList={activeUserList}
				isLoading={isLoading}
				isError={isError}
			/>
		</Widget>
	);
}
