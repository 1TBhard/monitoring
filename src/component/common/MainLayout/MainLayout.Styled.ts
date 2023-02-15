import { Layout as OriginLayout } from "antd";
import FONT_SIZE from "src/style/FONT_SIZE";
import styled from "styled-components";
import imageURL from "src/asset/image/boardBackground.webp";

export const Title = styled.h1`
	text-align: center;
	margin: 0;
	font-weight: bold;
	font-size: ${FONT_SIZE.MAIN_TITLE};
`;

export const Frame = styled(OriginLayout)`
	min-height: 100vh;
	margin: 0 auto;
	background-image: url(${imageURL});
	background-repeat: repeat;
`;

export const Header = styled(OriginLayout.Header)`
	background: #fff !important;
`;

export const Slider = styled(OriginLayout.Content)`
	background: #fff;
	max-width: 368px;
	height: 100%;
`;

export const Content = styled(OriginLayout.Content)`
	height: 100%;
`;

export const Footer = styled(OriginLayout.Footer)``;
