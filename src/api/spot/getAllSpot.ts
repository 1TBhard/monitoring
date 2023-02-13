import openWhatapAPI from "src/api/openWhatapAPI";
import { API_URL } from "src/const/API_URL";

export interface ResGetAllSpot {
	pcode: 8;
	act_agent: "6";
	inact_agent: "6";
	host: "1";
	cpucore: "2";
	txcount: "459";
	tps: "93.07";
	user: "1007";
	actx: "149";
	rtime: "1873";
	cpu: "29.35";
	threadpool_active: "0";
	threadpool_queue: "0";
	dbconn_total: "600.0";
	dbconn_act: "239.0";
	dbconn_idle: "361.0";
	act_method: "51";
	act_sql: "24";
	act_httpc: "64";
	act_dbc: "10";
	act_socket: "0";
}

export default async function getAllSpot() {
	const url = API_URL.SPOT;

	return openWhatapAPI.get<ResGetAllSpot>(url);
}
