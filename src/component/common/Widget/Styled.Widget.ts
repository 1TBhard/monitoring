import styled from "styled-components";
import { InfoCircleOutlined } from "@ant-design/icons";
import FONT_SIZE from "src/style/FONT_SIZE";

export const Frame = styled.div`
	padding: 10px;
	display: flex;
	flex-direction: column;
	background-color: #fff;
`;

export const Header = styled.div`
	margin-bottom: 20px;
	display: flex;
	justify-content: space-between;
	font-size: ${FONT_SIZE.TITLE};
`;

export const Title = styled.h3`
	font-weight: bold;
	margin: 0;
`;

export const TitleInfoIcon = styled(InfoCircleOutlined)`
	font-size: ${FONT_SIZE.TITLE};
`;

export const Body = styled.div``;
