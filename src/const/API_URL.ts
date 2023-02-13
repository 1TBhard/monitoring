import { API } from "src/const/ProxyApiURL";

export const OPEN_API = {
	"": {
		act_agent: "활성화 상태의 에이전트 수",
		inact_agent: "비활성화 상태의 에이전트 수",
		host: "호스트 수",
		cpucore: "호스트의 CPU 코어 합",
		txcount: "트랜잭션 수",
		tps: "초당 트랜잭션 수",
		user: "5분간 집계된 고유 사용자 수",
		actx: "액티브 트랜잭션 수",
		rtime: "평균 응답 시간",
		cpu: "CPU 사용률",
		threadpool_active: "쓰레드풀 활성 쓰레드 수",
		threadpool_queue: "쓰레드풀 큐잉 쓰레드 수",
		dbc_count: "전체 DB Connection 수",
		dbc_active: "활성(Active) DB Connection 수",
		dbc_idle: "비활성(Idle) DB Connection 수",
		act_method: "액티브 Method 수",
		act_sql: "액티브 SQL 수",
		act_httpc: "액티브 HTTP Call 수",
		act_dbc: "액티브 DB Connection 수",
		act_socket: "액티브 Socket 수",
	},
	json: {
		"exception/{stime}/{etime}": "Exception 발생 ",
	},
} as const;

// WARN: DO NOT CHANGE
const JSON = "json";

const baseURL = `/${API}/${JSON}`;

export const API_URL = {
	SPOT: `${baseURL}/spot`,
	AGENT: `${baseURL}/agents`,
	PROJECT: {
		INFO: `${baseURL}/projects`,
		MEMBER_LIST: `${baseURL}/project/:projectCode/members`,
	},
} as const;
