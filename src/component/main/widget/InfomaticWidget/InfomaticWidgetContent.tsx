import { memo } from "react";
import CustomLoading from "src/component/common/CustomLoading";
import { LOAD_FAIL, NO_DATA } from "src/const/MESSAGE";
import UtilList from "src/util/UtilList";
import LoadingState from "src/type/LoadingState";
import * as Styled from "./Styled.InfomaticWidget";

interface InfomaticWidgetContentProps {
	state: LoadingState;
	spotItemList: {
		subTitle: string;
		Indicator: number;
	}[];
}

function InfomaticWidgetContent({
	state,
	spotItemList,
}: InfomaticWidgetContentProps) {
	const isLoading = state === "init";
	const isError = state === "error";

	if (isError) {
		return <>{LOAD_FAIL}</>;
	}

	if (spotItemList.length === 0) {
		return <>{NO_DATA}</>;
	}

	return (
		<CustomLoading spinning={isLoading}>
			{spotItemList.map((item) => (
				<Styled.Item key={item.subTitle}>
					<Styled.SubTitle>{item.subTitle}</Styled.SubTitle>
					<Styled.Indicator>{item.Indicator}</Styled.Indicator>
				</Styled.Item>
			))}
		</CustomLoading>
	);
}

export default memo(InfomaticWidgetContent, (prevProps, nextProps) => {
	return (
		UtilList.isEqual(prevProps.spotItemList, nextProps.spotItemList) &&
		prevProps.state === nextProps.state
	);
});
