import * as Styled from "./Styled.Widget";
import FlexBox from "src/component/common/FlexBox";
import StaticHeadComponent from "src/component/common/Widget/StaticHeadComponent";
import { PropsWithChildren, ReactNode } from "react";
import { Skeleton } from "antd";

interface WidgetProps {
	title: string;
	description?: ReactNode;
	isLoading?: boolean;
	controlComponent?: ReactNode;
}

export default function Widget({
	title,
	description,
	isLoading = false,
	children,
	controlComponent,
}: PropsWithChildren<WidgetProps>) {
	return (
		<Styled.Frame>
			<Styled.Header>
				<StaticHeadComponent title={title} description={description} />
				{controlComponent && <FlexBox>{controlComponent}</FlexBox>}
			</Styled.Header>

			<Styled.Body>{isLoading ? <Skeleton active /> : children}</Styled.Body>
		</Styled.Frame>
	);
}
