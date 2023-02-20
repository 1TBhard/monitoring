import styled from "styled-components";
import { InfoCircleOutlined } from "@ant-design/icons";
import FONT_SIZE from "src/style/FONT_SIZE";

export const Frame = styled.div`
	padding: 10px;
	display: flex;
	flex-direction: column;
	background-color: #fff;
	border-radius: 15px;
	box-shadow: 10px 10px 30px -15px rgba(0, 0, 0, 0.75);
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
	font-size: inherit;
`;

export const TitleInfoIcon = styled(InfoCircleOutlined)`
	font-size: inherit;
`;

export const Body = styled.div``;

export const DescriptionFrame = styled.div`
	max-width: 400px;
`;
