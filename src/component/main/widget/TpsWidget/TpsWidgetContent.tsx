import { Area, AreaConfig } from "@ant-design/charts";
import { memo } from "react";
import CustomLoading from "src/component/common/CustomLoading";
import ErrorWrapper from "src/component/common/ErrorWrapper";
import { LOAD_FAIL } from "src/const/MESSAGE";
import { TPS_CAHRT_1_MIN_INTERVAL } from "src/const/STATISTICS";
import { UseTpsReturn } from "src/hook/spot/useTps";
import UtilDate from "src/util/UtilDate";
import UtilList from "src/util/UtilList";

interface TpsWidgetContentProps {
	isLoading: UseTpsReturn["isLoading"];
	isError: UseTpsReturn["isError"];
	tpsList: UseTpsReturn["tpsList"];
}

function TpsWidgetContent({
	tpsList,
	isError,
	isLoading,
}: TpsWidgetContentProps) {
	const areaConfig: AreaConfig = {
		data: tpsList,
		padding: "auto",
		xField: "date",
		yField: "value",
		isStack: false,
		animation: false,
		xAxis: {
			tickCount: tpsList.length / TPS_CAHRT_1_MIN_INTERVAL,
			label: {
				formatter: (timeString: string) =>
					UtilDate.getHHmmFromTimeString(timeString),
			},

			type: "time",
			mask: "YYYY-MM-DD HH:mm:ss",
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

export default memo(TpsWidgetContent, (prevProps, nextProps) => {
	return (
		prevProps.isError === nextProps.isError &&
		prevProps.isLoading === nextProps.isLoading &&
		UtilList.isEqual(prevProps.tpsList, nextProps.tpsList)
	);
});
