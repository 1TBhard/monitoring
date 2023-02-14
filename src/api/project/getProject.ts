import openWhatapAPI from "src/api/openWhatapAPI";
import { API_URL } from "src/const/API_URL";
import Project from "src/type/Project";

export default async function getProject() {
	const url = API_URL.PROJECT.INFO;

	return openWhatapAPI.get<Project>(url);
}
