import { Line, LineConfig } from "@ant-design/charts";
import { memo } from "react";
import CustomLoading from "src/component/common/CustomLoading";
import ErrorWrapper from "src/component/common/ErrorWrapper";
import { LOAD_FAIL } from "src/const/MESSAGE";
import useActiveUserByHour from "src/hook/statistics/useActiveUserByHour";
import UtilList from "src/util/UtilList";

interface ActiveUserWidgetContentProps
	extends ReturnType<typeof useActiveUserByHour> {}

function ActiveUserWidgetContent({
	isLoading,
	activeUserList,
	isError,
}: ActiveUserWidgetContentProps) {
	const lineConfig: LineConfig = {
		data: activeUserList,
		padding: "auto",
		xField: "date",
		yField: "activeUser",
		xAxis: {
			tickCount: activeUserList.length,
		},
	};

	if (isError) {
		return (
			<ErrorWrapper errorMessage={LOAD_FAIL} isError={true}>
				<Line {...lineConfig} />
			</ErrorWrapper>
		);
	}

	return (
		<CustomLoading spinning={isLoading}>
			<Line {...lineConfig} />
		</CustomLoading>
	);
}

export default memo(ActiveUserWidgetContent, (prevProps, nextProps) => {
	return (
		prevProps.isError === nextProps.isError &&
		prevProps.isLoading === nextProps.isLoading &&
		UtilList.isEqual(prevProps.activeUserList, nextProps.activeUserList)
	);
});
