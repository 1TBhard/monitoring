import openWhatapAPI from "src/api/openWhatapAPI";
import { API_URL } from "src/const/API_URL";

interface GetTpsParams {
	stime: number;
	etime: number;
}

export default function getTps(params: GetTpsParams) {
	const paramsWithTimeMerge = {
		...params,
		timeMerge: "avg",
	};
	const url = API_URL.STATISTICS.TPS;

	return openWhatapAPI.get<unknown, number>(url, {
		params: paramsWithTimeMerge,
	});
}
