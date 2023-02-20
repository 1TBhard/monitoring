import openWhatapAPI from "src/api/openWhatapAPI";
import { API_URL } from "src/const/API_URL";

export default function getTps() {
	const url = API_URL.SPOT.TPS;

	return openWhatapAPI.get<unknown, number>(url);
}
