import openWhatapAPI from "src/api/openWhatapAPI";
import { API_URL } from "src/const/API_URL";

export default function getAvgReponseTime() {
	const url = API_URL.SPOT.AVG_RESPONSE_TIME;

	return openWhatapAPI.get<unknown, number>(url);
}
