import * as Styled from "./Styled.InfomaticWidget";
import CustomLoading from "src/component/common/CustomLoading";
import ErrorWrapper from "src/component/common/ErrorWrapper";
import { LOAD_FAIL } from "src/const/MESSAGE";
import { UseSpotReturn } from "src/hook/spot/useSpot";
import { memo } from "react";
import UtilList from "src/util/UtilList";

export interface InfomaticWidgetContentProps
	extends Pick<UseSpotReturn, "spotItemList" | "isLoading" | "isError"> {}

function InfomaticWidgetContent({
	spotItemList,
	isLoading,
	isError,
}: InfomaticWidgetContentProps) {
	if (isError) {
		return <ErrorWrapper errorMessage={LOAD_FAIL} isError={true} />;
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
		prevProps.isError === nextProps.isError &&
		(prevProps.isLoading === nextProps.isLoading ||
			UtilList.isEqual(prevProps.spotItemList, nextProps.spotItemList))
	);
});
