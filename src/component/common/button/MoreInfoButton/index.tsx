import * as Styled from "./Styled.MoreInfoButton";

interface MoreInfoButtonProps {
	onClick?: React.MouseEventHandler<HTMLSpanElement>;
}

export default function MoreInfoButton({ onClick }: MoreInfoButtonProps) {
	return <Styled.Button onClick={onClick} />;
}
