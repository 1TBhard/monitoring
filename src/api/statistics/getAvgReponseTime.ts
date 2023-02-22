import openWhatapAPI from "src/api/openWhatapAPI";
import { API_URL } from "src/const/API_URL";

interface GetAvgReponseTimeParams {
	stime: number;
	etime: number;
}

export default function getAvgReponseTime(params: GetAvgReponseTimeParams) {
	const paramsWithTimeMerge = {
		...params,
		timeMerge: "avg",
	};
	const url = API_URL.STATISTICS.AVG_RESPONSE_TIME;

	return openWhatapAPI.get<unknown, number>(url, {
		params: paramsWithTimeMerge,
	});
}
