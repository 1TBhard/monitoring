import * as Styled from "./Styled.Dashboard";
import InfomaticWidget from "src/component/main/widget/InfomaticWidget";
import MainLayout from "src/component/common/MainLayout";
import useProject from "src/hook/project/useProject";
import ActiveUserWidget from "src/component/main/widget/ActiveUserWidget";
import SqlErrorWidget from "src/component/main/widget/SqlErrorWidget";
import TpsWidget from "src/component/main/widget/TpsWidget";
import AvgResponseTimeWidget from "src/component/main/widget/AvgResponseTimeWidget";

export default function Dashboard() {
	const { projectName } = useProject();

	return (
		<MainLayout title={projectName}>
			<Styled.GridFrame>
				<InfomaticWidget />
				<ActiveUserWidget />
				<SqlErrorWidget />
				<TpsWidget />
				<AvgResponseTimeWidget />
			</Styled.GridFrame>
		</MainLayout>
	);
}
