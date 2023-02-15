import CustomDrawer from "src/component/common/CustomDrawer";
import MoreInfoButton from "src/component/common/button/MoreInfoButton";
import ResponsiveTable from "src/component/common/table/ResponsiveTable";
import SqlErrorBarChart from "src/component/main/widget/SqlErrorWidget/SqlErrorBarChart";
import SqlStatistics from "src/type/SqlStatistics";
import useSqlStatistics from "src/hook/statistics/useSqlStatistics";
import Widget from "src/component/common/Widget";
import { TableProps } from "antd";
import { useCallback, useState } from "react";

interface SqlErrorWidgetProps {
	stime: number;
	etime: number;
}

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

export default function SqlErrorWidget({ stime, etime }: SqlErrorWidgetProps) {
	const { sqlStatistics, allSqlStatistics } = useSqlStatistics({
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
					<MoreInfoButton onClick={() => setIsShowDrawer(true)} />
				}
			>
				<SqlErrorBarChart data={sqlStatistics} />
			</Widget>
			<CustomDrawer
				open={isShowDrawer}
				title='금일 SQL 에러 상세'
				onClose={onClose}
				destroyOnClose={true}
			>
				<ResponsiveTable columns={columns} dataSource={allSqlStatistics} />
			</CustomDrawer>
		</>
	);
}
