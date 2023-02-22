import CustomLoading from "src/component/common/CustomLoading";
import ErrorWrapper from "src/component/common/ErrorWrapper";
import useActiveUserByHour from "src/hook/statistics/useActiveUserByHour";
import UtilDate from "src/util/UtilDate";
import { Area, AreaConfig } from "@ant-design/charts";
import { LOAD_FAIL } from "src/const/MESSAGE";

export default function ActiveUserWidgetContent() {
	const { stime, etime } = UtilDate.getTodayStimeEtime();
	const { activeUserList, isLoading, isError } = useActiveUserByHour({
		stime,
		etime,
	});

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
