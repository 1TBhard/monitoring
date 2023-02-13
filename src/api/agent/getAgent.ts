import openWhatapAPI from "src/api/openWhatapAPI";
import { API_URL } from "src/const/API_URL";
import { Agent } from "src/type/agent/Agent";
import { ResponseDataList } from "src/type/ResponseDataList";

export default async function getAgentInfo() {
	const url = API_URL.AGENT;

	return openWhatapAPI.get<ResponseDataList<Agent>>(url);
}
