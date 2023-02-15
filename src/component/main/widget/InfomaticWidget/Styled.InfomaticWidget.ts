import COLOR from "src/style/COLOR";
import FONT_SIZE from "src/style/FONT_SIZE";
import styled from "styled-components";

export const Frame = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

export const Item = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 80px;
`;

export const SubTitle = styled.span`
	color: ${COLOR.FONT.SUBTITLE};
	word-break: keep-all;
	font-size: ${FONT_SIZE.DEFAULT};
	font-weight: bold;
`;

export const Indicator = styled.p`
	text-align: right;
	margin: 0;
	font-size: ${FONT_SIZE.EMPHASIS};
`;
