import MoreInfoButton from "src/component/common/button/MoreInfoButton";
import SqlErrorBarChart from "src/component/main/widget/SqlErrorWidget/SqlErrorBarChart";
import SqlErrorDetailDrawer from "src/component/main/widget/SqlErrorWidget/SqlErrorDetailDrawer";
import useSqlStatistics from "src/hook/statistics/useSqlStatistics";
import UtilDate from "src/util/UtilDate";
import Widget from "src/component/common/Widget";
import { useCallback, useState } from "react";
import { DESCRIPTION } from "src/const/MESSAGE";

export default function SqlErrorWidget() {
	const { stime, etime } = UtilDate.getTodayStimeEtime();
	const { sqlStatistics, allSqlStatistics, isLoading, isError } =
		useSqlStatistics({
			stime,
			etime,
		});

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
				<SqlErrorBarChart
					isLoading={isLoading}
					isError={isError}
					data={sqlStatistics}
				/>
			</Widget>

			<SqlErrorDetailDrawer
				isLoading={isLoading}
				isError={isError}
				allSqlStatistics={allSqlStatistics}
				isShowDrawer={isShowDrawer}
				onClose={onClose}
			/>
		</>
	);
}
