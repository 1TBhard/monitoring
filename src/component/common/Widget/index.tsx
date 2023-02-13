import { Skeleton } from "antd";
import { PropsWithChildren } from "react";
import FlexBox from "src/component/common/FlexBox";
import * as Styled from "./Styled.Widget";

interface WidgetProps {
	title: string;
	isLoading?: boolean;
}

export default function Widget({
	title,
	isLoading = false,
	children,
}: PropsWithChildren<WidgetProps>) {
	return (
		<Styled.Frame>
			<Styled.Header>
				<FlexBox>
					<Styled.Title>{title}</Styled.Title>
					<Styled.TitleInfoIcon />
				</FlexBox>
			</Styled.Header>

			<Styled.Body>{isLoading ? <Skeleton active /> : children}</Styled.Body>
		</Styled.Frame>
	);
}
