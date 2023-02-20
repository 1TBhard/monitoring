import openWhatapAPI from "src/api/openWhatapAPI";
import { API_URL } from "src/const/API_URL";
import Spot from "src/type/Spot";

export default async function getSpot() {
	const url = API_URL.SPOT.INFO;

	return openWhatapAPI.get<unknown, Spot>(url);
}
