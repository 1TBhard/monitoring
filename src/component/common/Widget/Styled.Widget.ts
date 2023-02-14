import styled from "styled-components";
import { InfoCircleOutlined } from "@ant-design/icons";
import FONT_SIZE from "src/style/FONT_SIZE";

export const Frame = styled.div`
	padding: 10px;
	display: flex;
	flex-direction: column;
	background-color: #fff;
`;

export const Header = styled.div``;

export const Title = styled.h3`
	font-size: ${FONT_SIZE.TITLE};
	font-weight: bold;
`;

export const TitleInfoIcon = styled(InfoCircleOutlined)``;

export const Body = styled.div``;
