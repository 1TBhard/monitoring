import * as Styled from "./Styled.Dashboard";
import InfomaticWidget from "src/component/main/widget/InfomaticWidget";
import MainLayout from "src/component/common/MainLayout";
import useProject from "src/hook/project/useProject";

export default function Dashboard() {
	const { projectName } = useProject();

	return (
		<MainLayout title={projectName}>
			<Styled.GridFrame>
				<InfomaticWidget />
			</Styled.GridFrame>
		</MainLayout>
	);
}
