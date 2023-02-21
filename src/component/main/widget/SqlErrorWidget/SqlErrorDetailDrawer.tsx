import CustomDrawer, {
	CustomDrawerProps,
} from "src/component/common/CustomDrawer";
import ResponsiveTable from "src/component/common/table/ResponsiveTable";
import SqlStatistics from "src/type/SqlStatistics";
import useSqlStatistics from "src/hook/statistics/useSqlStatistics";
import UtilDate from "src/util/UtilDate";
import { LOAD_FAIL } from "src/const/MESSAGE";
import { memo } from "react";
import { TableProps } from "antd";

const columns = [
	{
		title: "발생 수",
		key: "count_error",
		align: "right",
		dataIndex: "count_error",
		width: 100,
		sorter: (a: SqlStatistics, b: SqlStatistics) =>
			a.count_error - b.count_error,
	},
	{
		title: "서비스",
		key: "service",
		dataIndex: "service",
		align: "left",
		width: 200,
		ellipsis: true,
		responsive: ["lg"],
		render: (service: SqlStatistics["service"]) => <code>{service}</code>,
	},
	{
		title: "sql문",
		key: "sql",
		dataIndex: "sql",
		align: "left",
		ellipsis: true,
		responsive: ["lg"],
		render: (sql: SqlStatistics["sql"]) => <code>{sql}</code>,
	},
	{
		title: "평균시간",
		key: "time_avg",
		dataIndex: "time_avg",
		align: "center",
		width: 100,
	},
	{
		title: "최대시간",
		key: "time_max",
		dataIndex: "time_max",
		align: "center",
		width: 100,
	},
] as TableProps<object>["columns"];

interface SqlErrorDetailDrawerProps {
	isShowDrawer: boolean;
	onClose: CustomDrawerProps["onClose"];
}

function SqlErrorDetailDrawer({
	isShowDrawer,
	onClose,
}: SqlErrorDetailDrawerProps) {
	const { stime, etime } = UtilDate.getTodayStimeEtime();
	const { allSqlStatistics, isLoading, isError } = useSqlStatistics({
		stime,
		etime,
	});

	return (
		<CustomDrawer
			open={isShowDrawer}
			title='금일 SQL 에러 상세'
			onClose={onClose}
			destroyOnClose={true}
		>
			{isError ? (
				<>{LOAD_FAIL}</>
			) : (
				<ResponsiveTable
					loading={isLoading}
					columns={columns}
					dataSource={allSqlStatistics}
				/>
			)}
		</CustomDrawer>
	);
}

export default memo(SqlErrorDetailDrawer, (prevProps, nextProps) => {
	return prevProps.isShowDrawer === nextProps.isShowDrawer;
});
