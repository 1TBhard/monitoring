import WithLoadingState from "src/type/WithLoadingState";
import Project from "src/type/Project";
import SqlStatistics from "src/type/SqlStatistics";
import ActiveUserList from "src/type/ActiveUserList";
import DateStatics from "src/type/DateStatics";

export const INITIAL_PROJECT: WithLoadingState<Project> = {
	state: "init",
	data: {
		platform: "",
		createTime: "",
		gatewayName: "",
		projectCode: "",
		status: "",
		lastUpdatedTime: "",
		name: "",
		productType: "",
	},
};

export const INITIAL_SPOT_ITEM_LIST: WithLoadingState<
	{
		subTitle: string;
		Indicator: number;
	}[]
> = {
	state: "init",
	data: [
		{
			subTitle: "총 에이전트",
			Indicator: 0,
		},
		{
			subTitle: "비활성화 에이전트",
			Indicator: 0,
		},
		{
			subTitle: "CPU 코어",
			Indicator: 0,
		},
		{
			subTitle: "호스트",
			Indicator: 0,
		},
	],
};

export const INITIAL_SQL_ERROR_LIST: WithLoadingState<SqlStatistics[]> = {
	data: [],
	state: "init",
};

export const INITIAL_ACTIVATE_USER_LIST: WithLoadingState<ActiveUserList> = {
	data: [],
	state: "init",
};

export const INITIAL_TPS_LIST: WithLoadingState<DateStatics<number>[]> = {
	data: [],
	state: "init",
};

export const INITIAL_AVG_RESPONSE_TIME_LIST: WithLoadingState<
	DateStatics<number>[]
> = {
	data: [],
	state: "init",
};
