import * as Styled from "./Styled.InfomaticWidget";
import CustomLoading from "src/component/common/CustomLoading";
import ErrorWrapper from "src/component/common/ErrorWrapper";
import useSpot from "src/hook/spot/useSpot";
import { LOAD_FAIL } from "src/const/MESSAGE";

export default function InfomaticWidgetContent() {
	const { spotItemList, isLoading, isError } = useSpot();

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
