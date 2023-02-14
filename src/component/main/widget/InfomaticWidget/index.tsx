import Widget from "src/component/common/Widget";
import * as Styled from "./Styled.InfomaticWidget";

export interface InfomaticWidgetProps {
	itemList: {
		subTitle: string;
		Indicator: number;
	}[];
}

export default function InfomaticWidget({ itemList }: InfomaticWidgetProps) {
	return (
		<Widget title='인포매틱스'>
			<Styled.Frame>
				{itemList.map((item, index) => (
					<Styled.Item key={`${item.subTitle}-${index}`}>
						<Styled.SubTitle>{item.subTitle}</Styled.SubTitle>
						<Styled.Indicator>{item.Indicator}</Styled.Indicator>
					</Styled.Item>
				))}
			</Styled.Frame>
		</Widget>
	);
}
