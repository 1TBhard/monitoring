import { memo, ReactNode } from "react";
import { Popover } from "antd";
import * as Styled from "./Styled.Widget";
import FlexBox from "src/component/common/FlexBox";

interface HeadComponentProps {
	title: string;
	description?: ReactNode;
}

function StaticHeadComponent({ title, description }: HeadComponentProps) {
	return (
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
	);
}

export default memo(StaticHeadComponent, (prevProps, nextProps) => {
	return (
		prevProps.title === nextProps.title &&
		prevProps.description === nextProps.description
	);
});
