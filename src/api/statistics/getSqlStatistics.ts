import openWhatapAPI from "src/api/openWhatapAPI";
import ResponseRecords from "src/type/ResponseRecords";
import SqlStatistics from "src/type/SqlStatistics";
import { API_URL } from "src/const/API_URL";

interface GetSqlStatisticsParams {
	stime: number;
	etime: number;
}

export default async function getSqlStatistics({
	stime,
	etime,
}: GetSqlStatisticsParams) {
	const url = API_URL.STATISTICS.SQL.replace(":stime", String(stime)).replace(
		":etime",
		String(etime)
	);

	return openWhatapAPI.get<unknown, ResponseRecords<SqlStatistics>>(url);
}
