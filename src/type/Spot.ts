interface Spot {
	pcode: number;
	act_agent: number;
	inact_agent: number;
	host: number;
	cpucore: number;
	txcount: number;
	tps: number;
	user: number;
	actx: number;
	rtime: number;
	cpu: number;
	threadpool_active: number;
	threadpool_queue: number;
	dbconn_total: number;
	dbconn_act: number;
	dbconn_idle: number;
	act_method: number;
	act_sql: number;
	act_httpc: number;
	act_dbc: number;
	act_socket: number;
}

export default Spot;
