import openWhatapAPI from "src/api/openWhatapAPI";
import { API_URL } from "src/const/API_URL";
import { AgentInfo } from "src/type/agent/AgentInfo";
import { ResponseDataList } from "src/type/ResponseDataList";

export default function getAgentInfo() {
	const url = API_URL.AGENT;

	return openWhatapAPI.get<ResponseDataList<AgentInfo>>(url);
}
