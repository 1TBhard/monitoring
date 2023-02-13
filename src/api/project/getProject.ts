import openWhatapAPI from "src/api/openWhatapAPI";
import { API_URL } from "src/const/API_URL";

export default async function getProject() {
	const url = API_URL.PROJECT.INFO;

	return openWhatapAPI.get(url);
}
