import styled from "styled-components";

const MIN_WIDTH = "250px";

export const GridFrame = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(${MIN_WIDTH}, 1fr));
	gap: 20px;
`;
