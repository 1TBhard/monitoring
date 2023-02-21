// SQL 에러 상위 항목 개수
export const TOP_SQL_ERROR_NUMBER = 5;

const TPS_CHART_AXIS_NUMBER = 5;

// TPS 차트 X축 사이 간격(1분간 몇 개의 데이터가 올 것인지)
export const TPS_CAHRT_1_MIN_INTERVAL = 60 / TPS_CHART_AXIS_NUMBER;

// TPS 차트에 표현할 max 데이터 개수
export const TPS_CHART_MAX_DATA_NUMBER = 60;

const AVG_REPONSE_TIME_CHART_AXIS_NUMBER = 5;

// 평균 응답시간 차트 사이 간격(1분간 몇 개의 데이터가 올 것인지)
export const AVG_REPONSE_TIME_CHART_1_MIN_INTERVAL =
	60 / AVG_REPONSE_TIME_CHART_AXIS_NUMBER;

// 평균 응답시간 차트에 표현할 max 데이터 개수
export const AVG_REPONSE_TIME_CHART_MAX_DATA_NUMBER = 60;
