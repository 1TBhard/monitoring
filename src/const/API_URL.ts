import { API } from "src/const/PROXY_API_URL";

const JSON = "json";
const RAW = "raw";
const baseURLjson = `/${API}/${JSON}`;
const baseURLraw = `/${API}/${RAW}`;

export const API_URL = {
	SPOT: {
		INFO: `${baseURLjson}/spot`,
	},
	AGENT: `${baseURLjson}/agents`,
	PROJECT: {
		INFO: `${baseURLjson}/project`,
		MEMBER_LIST: `${baseURLjson}/project/:projectCode/members`,
	},
	STATISTICS: {
		EXCEPTION: `${baseURLjson}/exception/:stime/:etime`,
		ACTIVE_USER_BY_HOUR: `${baseURLjson}/visitor_h/:stime/:etime`,
		SQL: `${baseURLjson}/sql/:stime/:etime`,
		TPS: `${baseURLraw}/tag/app_counter/tps`,
		AVG_RESPONSE_TIME: `${baseURLraw}/tag/app_counter/resp_time`,
	},
} as const;
