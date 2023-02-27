import * as Styled from "./Styled.Dashboard";
import ActiveUserWidget from "src/component/main/widget/ActiveUserWidget";
import InfomaticWidget from "src/component/main/widget/InfomaticWidget";
import MainLayout from "src/component/common/MainLayout";
import SqlErrorWidget from "src/component/main/widget/SqlErrorWidget";
import TpsWidget from "src/component/main/widget/TpsWidget";
import { memo } from "react";
import AvgResponseTimeWidget from "src/component/main/widget/AvgResponseTimeWidget";

function DashboardContent({ title }: { title: string }) {
	return (
		<MainLayout title={title}>
			<Styled.GridFrame>
				<InfomaticWidget />
				<SqlErrorWidget />
				<ActiveUserWidget />
				<TpsWidget />
				<AvgResponseTimeWidget />
			</Styled.GridFrame>
		</MainLayout>
	);
}

export default memo(DashboardContent, (prevProps, nextProps) => {
	return prevProps.title === nextProps.title;
});
