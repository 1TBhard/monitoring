import FlexBox from "src/component/common/FlexBox";
import { ReactNode } from "react";
import * as Styled from "./MainLayout.Styled";

interface LayoutProps {
	title: string;
	footerContent?: ReactNode;
	children: ReactNode;
}

export default function MainLayout({
	title,
	footerContent,
	children,
}: LayoutProps) {
	return (
		<Styled.Frame>
			<Styled.Header>
				<Styled.Title>{title}</Styled.Title>
			</Styled.Header>
			<FlexBox alignItems='stretch' height='100%'>
				<Styled.Content>{children}</Styled.Content>
			</FlexBox>
			{footerContent && <Styled.Footer>{footerContent}</Styled.Footer>}
		</Styled.Frame>
	);
}
