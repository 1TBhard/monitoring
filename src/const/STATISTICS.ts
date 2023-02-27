import { QUERY_COMMON } from "src/const/QUERY_CONST";

// SQL 에러 상위 항목 개수
export const TOP_SQL_ERROR_NUMBER = 5;

const TPS_CHART_AXIS_NUMBER = 5;

// TPS 차트 X축 사이 간격(1분간 몇 개의 데이터가 올 것인지)
export const TPS_CAHRT_1_MIN_INTERVAL = 60 / TPS_CHART_AXIS_NUMBER;

// TPS 차트에 표현할 max 데이터 개수
export const TPS_CHART_MAX_DATA_NUMBER = 60;

export const TPS_CAHRT = {
	DATA_NUMS_BY_1_MIN: 12,
	MAX_DATA_NUMBER: 60,
	INTERVAL_SEC: QUERY_COMMON.REFETCH_INTERVAL / 1000,
};

export const AVG_RESPONSE_TIME_CAHRT = {
	DATA_NUMS_BY_1_MIN: 12,
	MAX_DATA_NUMBER: 60,
	INTERVAL_SEC: QUERY_COMMON.REFETCH_INTERVAL / 1000,
};

export const CALL_BIAS_SECONDS = -20;

export const MAX_RETRY_API_QUEUE_ITEM = 3;
