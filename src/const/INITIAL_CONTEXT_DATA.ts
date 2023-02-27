import WithLoadingState from "src/type/WithLoadingState";
import Project from "src/type/Project";
import SqlStatistics from "src/type/SqlStatistics";
import ActiveUserList from "src/type/ActiveUserList";

export const INITIAL_PROJECT: WithLoadingState<Project> = {
	state: "idle",
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
	state: "idle",
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
	state: "idle",
};

export const INITIAL_ACTIVATE_USER_LIST: WithLoadingState<ActiveUserList> = {
	data: [],
	state: "idle",
};
