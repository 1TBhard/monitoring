/* eslint-disable react-hooks/exhaustive-deps */
import CustomError from "src/util/CustomError";
import getProject from "src/api/project/getProject";
import getSpot from "src/api/spot/getSpot";
import getSqlStatistics, {
	GetSqlStatisticsParams,
} from "src/api/statistics/getSqlStatistics";
import LoadingState from "src/type/LoadingState";
import Project from "src/type/Project";
import SqlStatistics from "src/type/SqlStatistics";
import UtilDate from "src/util/UtilDate";
import WithLoadingState from "src/type/WithLoadingState";
import { ApiQueueItem, ApiQueue } from "src/api/ApiQueue";
import { createContext, ReactNode, useEffect, useState } from "react";
import {
	INITIAL_PROJECT,
	INITIAL_SPOT_ITEM_LIST,
	INITIAL_SQL_ERROR_LIST,
} from "src/const/INITIAL_CONTEXT_DATA";

interface WidgetData {
	project: WithLoadingState<Project>;
	spotItemList: WithLoadingState<
		{
			subTitle: string;
			Indicator: number;
		}[]
	>;
	sqlErrorList: WithLoadingState<SqlStatistics[]>;
}

export const WidgetDataContext = createContext<WidgetData>({
	project: INITIAL_PROJECT,
	spotItemList: INITIAL_SPOT_ITEM_LIST,
	sqlErrorList: INITIAL_SQL_ERROR_LIST,
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

	const changeState = (key: string, nextState: LoadingState) => {
		switch (key) {
			case "PROJECT_INFO": {
				setProject((prevProject) => ({ ...prevProject, state: nextState }));
				break;
			}

			case "INFOMATIC": {
				setSpotItemList((prevSpotItemList) => ({
					...prevSpotItemList,
					state: nextState,
				}));
				break;
			}

			case "SQL_ERROR": {
				setSqlErrorList((prevSqlErrorList) => ({
					...prevSqlErrorList,
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
		const reducer = async ({ type, params, body }: ApiQueueItem) => {
			changeState(type, "loading");

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
					}
				}
			} catch (error) {
				changeState(type, "error");
			}
		};

		const originApiQueue = new ApiQueue({
			invervalMs: 5000,
			queueMaxLength: 100,
			workByInterval: 5,
			reducer,
		});

		originApiQueue.push({
			type: "PROJECT_INFO",
		});
		originApiQueue.push({
			type: "INFOMATIC",
		});

		const { stime, etime } = UtilDate.getTodayStimeEtime();
		originApiQueue.push({
			type: "SQL_ERROR",
			params: { stime, etime },
		});

		originApiQueue.startFlush();

		return () => {
			originApiQueue.clearFlush();
		};
	}, []);

	return (
		<WidgetDataContext.Provider
			value={{
				project,
				spotItemList,
				sqlErrorList,
			}}
		>
			<>{children}</>
		</WidgetDataContext.Provider>
	);
}
