import openWhatapAPI from "src/api/openWhatapAPI";
import { API_URL } from "src/const/API_URL";

interface GetActiveUserByHourParams {
	stime: number;
	etime: number;
}

export interface ResGetActiveUserByHour {
	data: [number, number][];
	pcode: number;
	stime: number;
	etime: number;
	total: number;
}

export default async function getActiveUserByHour({
	stime,
	etime,
}: GetActiveUserByHourParams) {
	const url = API_URL.STATISTICS.ACTIVE_USER_BY_HOUR.replace(
		":stime",
		String(stime)
	).replace(":etime", String(etime));

	return openWhatapAPI.get<unknown, ResGetActiveUserByHour>(url);
}
