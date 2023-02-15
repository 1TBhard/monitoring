import { Tooltip } from "antd";
import * as Styled from "./Styled.MoreInfoButton";

interface MoreInfoButtonProps {
	onClick?: React.MouseEventHandler<HTMLSpanElement>;
	description?: string;
}

export default function MoreInfoButton({
	onClick,
	description,
}: MoreInfoButtonProps) {
	return (
		<Tooltip title={description}>
			<Styled.Button onClick={onClick} />
		</Tooltip>
	);
}
