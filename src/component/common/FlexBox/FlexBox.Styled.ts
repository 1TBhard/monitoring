import { FlexBoxProps } from "src/component/common/FlexBox";
import styled from "styled-components";

// eslint-disable-next-line import/prefer-default-export
export const Frame = styled.div<Omit<FlexBoxProps, "className">>`
	display: flex;
	flex-direction: ${(props) => props.flexDirection || "row"};
	justify-content: ${(props) => props.justifyContent};
	align-items: ${(props) => props.alignItems};
	gap: ${(props) => props.gap || "10px"};
	width: ${(props) => props.width || "auto"};
	height: ${(props) => props.height || "auto"};
`;
