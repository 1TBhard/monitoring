import CustomLoading from "src/component/common/CustomLoading";
import ErrorWrapper from "src/component/common/ErrorWrapper";
import useActiveUserByHour from "src/hook/statistics/useActiveUserByHour";
import UtilList from "src/util/UtilList";
import { Area, AreaConfig } from "@ant-design/charts";
import { LOAD_FAIL } from "src/const/MESSAGE";
import { memo } from "react";

interface ActiveUserWidgetContentProps
	extends ReturnType<typeof useActiveUserByHour> {}

function ActiveUserWidgetContent({
	isLoading,
	activeUserList,
	isError,
}: ActiveUserWidgetContentProps) {
	const areaConfig: AreaConfig = {
		data: activeUserList,
		padding: "auto",
		xField: "date",
		yField: "activeUser",
		seriesField: "dayType",
		isStack: false,
		xAxis: {
			tickCount: activeUserList.length,
		},
		yAxis: {
			label: {
				formatter: (v) =>
					`${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
			},
		},
	};

	if (isError) {
		return (
			<ErrorWrapper errorMessage={LOAD_FAIL} isError={true}>
				<Area {...areaConfig} />
			</ErrorWrapper>
		);
	}

	return (
		<CustomLoading spinning={isLoading}>
			<Area {...areaConfig} />
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
