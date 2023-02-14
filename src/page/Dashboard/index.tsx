import dayjs from "dayjs";
import MainLayout from "src/component/common/MainLayout";
import ActiveUserWidget from "src/component/main/widget/ActiveUserWidget";
import InfomaticWidget from "src/component/main/widget/InfomaticWidget";
import useProject from "src/hook/project/useProject";
import useSpot from "src/hook/spot/useSpot";
import useActiveUserByHour from "src/hook/statistics/useActiveUserByHour";
import * as Styled from "./Styled.Dashboard";

export default function Dashboard() {
	const { projectName } = useProject();
	const { spotItemList } = useSpot();

	const stime = dayjs().startOf("day").toDate().getTime();
	const etime = dayjs().endOf("day").toDate().getTime();

	const { activeUserList } = useActiveUserByHour({
		etime,
		stime,
	});

	return (
		<MainLayout title={projectName}>
			<Styled.GridFrame>
				<InfomaticWidget itemList={spotItemList} />
				<ActiveUserWidget activeUserList={activeUserList} />
			</Styled.GridFrame>
		</MainLayout>
	);
}
