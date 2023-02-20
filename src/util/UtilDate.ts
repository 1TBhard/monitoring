import dayjs from "dayjs";

export default class UtilDate {
	static dateBumberToHHmm(dateNumber: number) {
		const day = dayjs(new Date(dateNumber));

		return day.format("HH:mm");
	}

	/**
	 * @description 00:00 ~ 현재시간을 반환한다.
	 */
	static getTodayStimeEtime() {
		const stime = dayjs().startOf("day").toDate().getTime();
		const etime = dayjs().endOf("day").toDate().getTime();

		return { stime, etime };
	}

	/**
	 * @description 어제 00:00 ~ 23:59을 반환한다.
	 */
	static getYesterdayStimeEtime(dateNumber: number) {
		const yesterday = dayjs(new Date(dateNumber)).add(-1, "day");
		const stime = yesterday.startOf("day").toDate().getTime();
		const etime = yesterday.endOf("day").toDate().getTime();

		return { stime, etime };
	}
}
