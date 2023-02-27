import ActiveUserList from "src/type/ActiveUserList";
import CustomLoading from "src/component/common/CustomLoading";
import ErrorWrapper from "src/component/common/ErrorWrapper";
import WithLoadingState from "src/type/WithLoadingState";
import { Area, AreaConfig } from "@ant-design/charts";
import { LOAD_FAIL } from "src/const/MESSAGE";
import { memo } from "react";

interface ActiveUserWidgetContentProps {
	todayActiveUserList: WithLoadingState<ActiveUserList>;
	yesaterdayActiveUserList: WithLoadingState<ActiveUserList>;
}

function ActiveUserWidgetContent({
	todayActiveUserList,
	yesaterdayActiveUserList,
}: ActiveUserWidgetContentProps) {
	const isLoading =
		todayActiveUserList.state === "loading" ||
		yesaterdayActiveUserList.state === "loading";

	const isError =
		todayActiveUserList.state === "error" ||
		yesaterdayActiveUserList.state === "error";

	const activeUserList = todayActiveUserList.data.concat(
		yesaterdayActiveUserList.data
	);

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
		// prevProps.yesaterdayActiveUserList.state ===
		// 	nextProps.yesaterdayActiveUserList.state &&
		// prevProps.todayActiveUserList.state ===
		// 	nextProps.todayActiveUserList.state &&
		prevProps.yesaterdayActiveUserList.data.length ===
			nextProps.yesaterdayActiveUserList.data.length &&
		prevProps.todayActiveUserList.data.length ===
			nextProps.todayActiveUserList.data.length
	);
});
