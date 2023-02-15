import { API } from "src/const/PROXY_API_URL";

const JSON = "json";
const baseURL = `/${API}/${JSON}`;

export const API_URL = {
	SPOT: `${baseURL}/spot`,
	AGENT: `${baseURL}/agents`,
	PROJECT: {
		INFO: `${baseURL}/project`,
		MEMBER_LIST: `${baseURL}/project/:projectCode/members`,
	},
	STATISTICS: {
		EXCEPTION: `${baseURL}/exception/:stime/:etime`,
		ACTIVE_USER_BY_HOUR: `${baseURL}/visitor_h/:stime/:etime`,
		SQL: `${baseURL}/sql/:stime/:etime`,
	},
} as const;
