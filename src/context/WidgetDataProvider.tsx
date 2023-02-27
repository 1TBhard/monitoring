/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import { debounce } from "lodash";
import { createContext, ReactNode, useEffect, useState } from "react";
import { ApiQueue, ApiQueueItem, ApiQueueItemType } from "src/api/ApiQueue";
import getProject from "src/api/project/getProject";
import getSpot from "src/api/spot/getSpot";
import getActiveUserByHour, {
	GetActiveUserByHourParams,
} from "src/api/statistics/getActiveUserByHour";
import getAvgReponseTime from "src/api/statistics/getAvgReponseTime";
import getSqlStatistics, {
	GetSqlStatisticsParams,
} from "src/api/statistics/getSqlStatistics";
import getTps from "src/api/statistics/getTps";
import {
	API_QUEUE_MAX_LENGTH,
	COMMON_INVERVAL_MS,
	COMMON_REMAIN_RETRY,
	WORK_BY_INTERVAL,
} from "src/const/API_CALL";
import {
	INITIAL_ACTIVATE_USER_LIST,
	INITIAL_AVG_RESPONSE_TIME_LIST,
	INITIAL_PROJECT,
	INITIAL_SPOT_ITEM_LIST,
	INITIAL_SQL_ERROR_LIST,
	INITIAL_TPS_LIST,
} from "src/const/INITIAL_CONTEXT_DATA";
import {
	AVG_RESPONSE_TIME_CAHRT,
	CALL_BIAS_SECONDS,
	TPS_CAHRT,
} from "src/const/STATISTICS";
import ActiveUserList from "src/type/ActiveUserList";
import DateStatics from "src/type/DateStatics";
import LoadingState from "src/type/LoadingState";
import Project from "src/type/Project";
import SqlStatistics from "src/type/SqlStatistics";
import WithLoadingState from "src/type/WithLoadingState";
import CustomError from "src/util/CustomError";
import UtilDate from "src/util/UtilDate";

interface WidgetData {
	project: WithLoadingState<Project>;
	spotItemList: WithLoadingState<
		{
			subTitle: string;
			Indicator: number;
		}[]
	>;
	sqlErrorList: WithLoadingState<SqlStatistics[]>;
	todayActiveUserList: WithLoadingState<ActiveUserList>;
	yesaterdayActiveUserList: WithLoadingState<ActiveUserList>;
	tpsList: WithLoadingState<DateStatics<number>[]>;
	avgResTimeList: WithLoadingState<DateStatics<number>[]>;
}

export const WidgetDataContext = createContext<WidgetData>({
	project: INITIAL_PROJECT,
	spotItemList: INITIAL_SPOT_ITEM_LIST,
	sqlErrorList: INITIAL_SQL_ERROR_LIST,
	todayActiveUserList: INITIAL_ACTIVATE_USER_LIST,
	yesaterdayActiveUserList: INITIAL_ACTIVATE_USER_LIST,
	tpsList: INITIAL_TPS_LIST,
	avgResTimeList: INITIAL_AVG_RESPONSE_TIME_LIST,
});

export default function WidgetDataProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [project, setProject] =
		useState<WithLoadingState<Project>>(INITIAL_PROJECT);

	const [spotItemList, setSpotItemList] = useState<
		WithLoadingState<
			{
				subTitle: string;
				Indicator: number;
			}[]
		>
	>(INITIAL_SPOT_ITEM_LIST);

	const [sqlErrorList, setSqlErrorList] = useState<
		WithLoadingState<SqlStatistics[]>
	>(INITIAL_SQL_ERROR_LIST);

	const [todayActiveUserList, setTodayActiveUserList] = useState<
		WithLoadingState<ActiveUserList>
	>(INITIAL_ACTIVATE_USER_LIST);

	const [yesaterdayActiveUserList, setYesaterdayActiveUserList] = useState<
		WithLoadingState<ActiveUserList>
	>(INITIAL_ACTIVATE_USER_LIST);

	const [tpsList, setTpsList] =
		useState<WithLoadingState<DateStatics<number>[]>>(INITIAL_TPS_LIST);

	const [avgResTimeList, setAvgResTimeList] = useState<
		WithLoadingState<DateStatics<number>[]>
	>(INITIAL_AVG_RESPONSE_TIME_LIST);

	const changeState = (key: ApiQueueItemType, nextState: LoadingState) => {
		switch (key) {
			case "PROJECT_INFO": {
				setProject((prevProject) => ({ ...prevProject, state: nextState }));
				break;
			}

			case "INFOMATIC": {
				setSpotItemList((prevState) => ({
					...prevState,
					state: nextState,
				}));
				break;
			}

			case "SQL_ERROR": {
				setSqlErrorList((prevState) => ({
					...prevState,
					state: nextState,
				}));
				break;
			}

			case "TODAY_ACTIVATE_USER": {
				setTodayActiveUserList((prevState) => ({
					data: prevState?.data ?? [],
					state: nextState,
				}));
				break;
			}

			case "YESTERDAY_ACTIVATE_USER": {
				setYesaterdayActiveUserList((prevState) => ({
					data: prevState?.data ?? [],
					state: nextState,
				}));
				break;
			}

			case "TPS": {
				setTpsList((prevState) => ({
					data: prevState?.data ?? [],
					state: nextState,
				}));
				break;
			}

			case "AVG_RESPONSE_TIME": {
				setAvgResTimeList((prevState) => ({
					data: prevState?.data ?? [],
					state: nextState,
				}));
				break;
			}

			default: {
				throw new CustomError({
					customErrorMessage: "잘못된 changeState 상태",
				});
			}
		}
	};

	useEffect(() => {
		const reducer = async ({
			type,
			params,
			remainRetry: retry,
		}: ApiQueueItem) => {
			try {
				switch (type) {
					case "PROJECT_INFO": {
						const res = await getProject();
						setProject({
							data: res,
							state: "success",
						});

						break;
					}

					case "INFOMATIC": {
						const resSpot = await getSpot();

						setSpotItemList({
							state: "success",
							data: [
								{
									subTitle: "총 에이전트",
									Indicator:
										Number(resSpot?.act_agent ?? 0) +
										Number(resSpot?.inact_agent ?? 0),
								},
								{
									subTitle: "비활성화 에이전트",
									Indicator: resSpot?.inact_agent ?? 0,
								},
								{
									subTitle: "CPU 코어",
									Indicator: resSpot?.cpucore ?? 0,
								},
								{
									subTitle: "호스트",
									Indicator: resSpot?.host ?? 0,
								},
							],
						});

						break;
					}

					case "SQL_ERROR": {
						const parsedParams = params as GetSqlStatisticsParams;
						const sqlError = await getSqlStatistics(parsedParams);

						setSqlErrorList({
							data:
								sqlError.records.sort(
									(a, b) => b.count_error - a.count_error
								) ?? [],
							state: "success",
						});
						break;
					}

					case "TODAY_ACTIVATE_USER": {
						const parsedParms = params as GetActiveUserByHourParams;
						const res = await getActiveUserByHour(parsedParms);

						setTodayActiveUserList({
							data: res.data.map((d) => ({
								date: UtilDate.dateBumberToHHmm(d[0]),
								activeUser: d[1],
								dayType: "오늘",
							})),
							state: "success",
						});
						break;
					}

					case "YESTERDAY_ACTIVATE_USER": {
						const parsedParms = params as GetActiveUserByHourParams;
						const res = await getActiveUserByHour(parsedParms);

						setYesaterdayActiveUserList({
							data: res.data.map((d) => ({
								date: UtilDate.dateBumberToHHmm(d[0]),
								activeUser: d[1],
								dayType: "어제",
							})),
							state: "success",
						});
						break;
					}

					case "TPS": {
						const lastTpsItem = tpsList.data[tpsList.data.length - 1];
						const currentDate = dayjs()
							.add(CALL_BIAS_SECONDS, "seconds")
							.toDate();
						const closeDateBySec = UtilDate.getCloseIntervalSecDate(
							currentDate,
							TPS_CAHRT.INTERVAL_SEC
						);

						const lastTime = lastTpsItem?.date ?? closeDateBySec;

						const nextStime = dayjs(lastTime).add(5, "seconds");
						const nextEtime = dayjs(nextStime).add(5, "seconds");

						const res = await getTps({
							stime: nextStime.toDate().getTime(),
							etime: nextEtime.toDate().getTime(),
						});

						setTpsList((prevTpsDataList) => ({
							data: [
								...prevTpsDataList.data,
								{ date: nextStime.toDate(), value: res },
							].slice(
								TPS_CAHRT.MAX_DATA_NUMBER < prevTpsDataList.data.length
									? prevTpsDataList.data.length - TPS_CAHRT.MAX_DATA_NUMBER
									: 0
							),
							state: "success",
						}));

						break;
					}

					case "AVG_RESPONSE_TIME": {
						const lastAvgResTimeItem =
							avgResTimeList.data[avgResTimeList.data.length - 1];
						const currentDate = dayjs()
							.add(CALL_BIAS_SECONDS, "seconds")
							.toDate();
						const closeDateBySec = UtilDate.getCloseIntervalSecDate(
							currentDate,
							TPS_CAHRT.INTERVAL_SEC
						);

						const lastTime = lastAvgResTimeItem?.date ?? closeDateBySec;

						const nextStime = dayjs(lastTime).add(5, "seconds");
						const nextEtime = dayjs(nextStime).add(5, "seconds");

						const res = await getAvgReponseTime({
							stime: nextStime.toDate().getTime(),
							etime: nextEtime.toDate().getTime(),
						});

						setAvgResTimeList((prevTpsDataList) => ({
							data: [
								...prevTpsDataList.data,
								{ date: nextStime.toDate(), value: res },
							].slice(
								AVG_RESPONSE_TIME_CAHRT.MAX_DATA_NUMBER <
									prevTpsDataList.data.length
									? prevTpsDataList.data.length -
											AVG_RESPONSE_TIME_CAHRT.MAX_DATA_NUMBER
									: 0
							),
							state: "success",
						}));

						break;
					}
				}
			} catch (error) {
				changeState(type, "error");

				originApiQueue.stop();

				console.log("error", error);

				// startFlush 재시도
				debounce(originApiQueue.start, 3000)();

				// 재시도한 횟수를 더한 Queue Item으로 등록
				originApiQueue.unshift({ type, params, remainRetry: (retry ?? 0) + 1 });
			}
		};

		const { stime, etime } = UtilDate.getTodayStimeEtime();
		const { stime: yesterdayStime, etime: yesterdayEtime } =
			UtilDate.getYesterdayStimeEtime(stime);

		var originApiQueue = new ApiQueue({
			invervalMs: COMMON_INVERVAL_MS,
			queueMaxLength: API_QUEUE_MAX_LENGTH,
			workByInterval: WORK_BY_INTERVAL,
			apiCallList: [
				{ type: "PROJECT_INFO", remainRetry: COMMON_REMAIN_RETRY },
				{ type: "INFOMATIC", remainRetry: COMMON_REMAIN_RETRY },
				{
					type: "SQL_ERROR",
					params: { stime, etime },
					remainRetry: COMMON_REMAIN_RETRY,
				},
				{
					type: "TODAY_ACTIVATE_USER",
					params: { stime, etime },
					remainRetry: COMMON_REMAIN_RETRY,
				},
				{
					type: "YESTERDAY_ACTIVATE_USER",
					params: {
						stime: yesterdayStime,
						etime: yesterdayEtime,
					},
					remainRetry: COMMON_REMAIN_RETRY,
				},
				{
					type: "TPS",
					remainRetry: COMMON_REMAIN_RETRY,
				},
				{
					type: "AVG_RESPONSE_TIME",
					remainRetry: COMMON_REMAIN_RETRY,
				},
			],
			reducer,
		});

		originApiQueue.start();

		return () => {
			originApiQueue.clear();
		};
	}, []);

	return (
		<WidgetDataContext.Provider
			value={{
				project,
				spotItemList,
				sqlErrorList,
				todayActiveUserList,
				yesaterdayActiveUserList,
				tpsList,
				avgResTimeList,
			}}
		>
			<>{children}</>
		</WidgetDataContext.Provider>
	);
}
