import { TPS_CHART_MAX_DATA_NUMBER } from "src/const/STATISTICS";

interface TpsStatics {
	value: number;
	date: Date;
}

const LOCAL_SOTARGET_TPS_KEY = "TPS";

export default class UtilLocalstoagetTps {
	static count() {
		return UtilLocalstoagetTps.get().length;
	}

	static isLimit() {
		return this.count() > TPS_CHART_MAX_DATA_NUMBER;
	}

	static isEmpty() {
		return !localStorage.getItem(LOCAL_SOTARGET_TPS_KEY)?.length;
	}

	static add(tpsStatics: TpsStatics) {
		const currentList = this.get();
		const nextList = [...currentList, tpsStatics];

		if (this.isLimit()) {
			nextList.splice(0, this.count() - TPS_CHART_MAX_DATA_NUMBER);
		}

		localStorage.setItem(LOCAL_SOTARGET_TPS_KEY, JSON.stringify(nextList));
	}

	static get() {
		if (!this.isEmpty()) {
			return JSON.parse(
				localStorage.getItem(LOCAL_SOTARGET_TPS_KEY)!
			) as TpsStatics[];
		}

		return [];
	}
}
