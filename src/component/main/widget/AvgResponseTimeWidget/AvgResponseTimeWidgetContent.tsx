import CustomLoading from "src/component/common/CustomLoading";
import ErrorWrapper from "src/component/common/ErrorWrapper";
import UtilDate from "src/util/UtilDate";
import { Area, AreaConfig } from "@ant-design/charts";
import { AVG_REPONSE_TIME_CHART_1_MIN_INTERVAL } from "src/const/STATISTICS";
import { LOAD_FAIL } from "src/const/MESSAGE";
import { UseAvgResponseTimeReturn } from "src/hook/spot/useAvgResponseTime";
import UtilNumber from "src/util/UtilNumber";
import UtilList from "src/util/UtilList";
import { memo } from "react";

interface AvgResponseTimeWidgetContentProps {
	avgResponseTimeList: UseAvgResponseTimeReturn["avgResponseTimeList"];
	isError: UseAvgResponseTimeReturn["isError"];
	isLoading: UseAvgResponseTimeReturn["isLoading"];
}

function AvgResponseTimeWidgetContent({
	avgResponseTimeList,
	isError,
	isLoading,
}: AvgResponseTimeWidgetContentProps) {
	const areaConfig: AreaConfig = {
		data: avgResponseTimeList,
		padding: "auto",
		xField: "date",
		yField: "value",
		isStack: false,
		animation: false,
		xAxis: {
			tickCount:
				avgResponseTimeList.length / AVG_REPONSE_TIME_CHART_1_MIN_INTERVAL,
			label: {
				formatter: (timeString: string) =>
					UtilDate.getHHmmFromTimeString(timeString),
			},

			type: "time",
			mask: "YYYY-MM-DD HH:mm:ss",
		},
		yAxis: {
			label: {
				formatter: (v) => `${UtilNumber.toLocaleString(v)}s`,
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

export default memo(AvgResponseTimeWidgetContent, (prevProps, nextProps) => {
	return (
		prevProps.isError === nextProps.isError &&
		prevProps.isLoading === nextProps.isLoading &&
		UtilList.isEqual(
			prevProps.avgResponseTimeList,
			nextProps.avgResponseTimeList
		)
	);
});
