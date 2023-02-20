import * as Styled from "./Styled.Widget";
import FlexBox from "src/component/common/FlexBox";
import { Popover, Skeleton } from "antd";
import { PropsWithChildren, ReactNode } from "react";

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
				<FlexBox>
					<Styled.Title>{title}</Styled.Title>
					{description && (
						<Popover
							placement='left'
							title={title}
							content={
								<Styled.DescriptionFrame>{description}</Styled.DescriptionFrame>
							}
						>
							<Styled.TitleInfoIcon />
						</Popover>
					)}
				</FlexBox>

				{controlComponent && <FlexBox>{controlComponent}</FlexBox>}
			</Styled.Header>

			<Styled.Body>{isLoading ? <Skeleton active /> : children}</Styled.Body>
		</Styled.Frame>
	);
}
