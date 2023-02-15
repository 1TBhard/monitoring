import styled from "styled-components";

const MIN_WIDTH = "250px";

export const GridFrame = styled.div`
	display: grid;
	height: auto;
	padding: 20px;

	grid-template-columns: repeat(auto-fit, minmax(${MIN_WIDTH}, 1fr));
	grid-template-rows: repeat(auto-fit, 500px);
	gap: 20px;
`;
