import React from "react";
import Widget from "src/component/common/Widget";
import AvgResponseTimeDescription from "src/component/main/widget/AvgResponseTimeWidget/AvgResponseTimeDescription";
import AvgResponseTimeWidgetContent from "src/component/main/widget/AvgResponseTimeWidget/AvgResponseTimeWidgetContent";
import useAvgResponseTime from "src/hook/spot/useAvgResponseTime";

export default function AvgResponseTimeWidget() {
	const { avgResponseTimeList, isError, isLoading } = useAvgResponseTime();

	return (
		<Widget title='평균 응답시간' description={<AvgResponseTimeDescription />}>
			<AvgResponseTimeWidgetContent
				avgResponseTimeList={avgResponseTimeList}
				isError={isError}
				isLoading={isLoading}
			/>
		</Widget>
	);
}
