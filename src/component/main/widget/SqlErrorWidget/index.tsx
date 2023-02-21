import MoreInfoButton from "src/component/common/button/MoreInfoButton";
import SqlErrorBarChart from "src/component/main/widget/SqlErrorWidget/SqlErrorBarChart";
import SqlErrorDetailDrawer from "src/component/main/widget/SqlErrorWidget/SqlErrorDetailDrawer";
import Widget from "src/component/common/Widget";
import { DESCRIPTION } from "src/const/MESSAGE";
import { useCallback, useState } from "react";

export default function SqlErrorWidget() {
	const [isShowDrawer, setIsShowDrawer] = useState(false);
	const onClose = useCallback(() => {
		setIsShowDrawer(false);
	}, []);

	return (
		<>
			<Widget
				title='금일 SQL 에러'
				description='금일 발생한 가장 많이 SQL 에러가 발생한 상위 5개의 서비스를 보여줍니다.'
				controlComponent={
					<MoreInfoButton
						description={DESCRIPTION.MORE_INFO_BUTTON}
						onClick={() => setIsShowDrawer(true)}
					/>
				}
			>
				<SqlErrorBarChart />
			</Widget>

			<SqlErrorDetailDrawer isShowDrawer={isShowDrawer} onClose={onClose} />
		</>
	);
}
