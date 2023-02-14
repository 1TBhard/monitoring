import InfomaticWidget from "src/component/main/widget/InfomaticWidget";
import MainLayout from "src/component/common/MainLayout";
import useProject from "src/hook/project/useProject";
import useSpot from "src/hook/spot/useSpot";
import * as Styled from "./Styled.Dashboard";

export default function Dashboard() {
	const { projectName } = useProject();
	const { spotItemList } = useSpot();

	return (
		<MainLayout title={projectName}>
			<Styled.GridFrame>
				<InfomaticWidget itemList={spotItemList} />
			</Styled.GridFrame>
		</MainLayout>
	);
}
