interface SqlStatistics {
	time_max: number;
	dbcHash: number;
	db: string;
	time_min: number;
	fetch_count: number;
	hash: number;
	service: string;
	fetch_time: number;
	sql_crud: number;
	count_total: number;
	count_error: number;
	sql: string;
	time_sum: number;
	time_avg: number;
	time_std: string;
	count_actived: number;
}

export default SqlStatistics;
