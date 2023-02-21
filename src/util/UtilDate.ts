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
		const etime = dayjs().toDate().getTime();

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

	static getNowYYYYmmDDhhMMss() {
		return dayjs().format("YYYY-MM-DD HH:mm:ss");
	}

	static getHHmmFromTimeString(timeString: string) {
		const date = dayjs(new Date(timeString));

		return date.format("HH:mm");
	}

	/**
	 * @description
	 *  가까운 intervalSec 간격의 초단위의 시간을 반환
	 *  예) date=2023-02-20 17:51 intervalSec=5
	 *      => 2023-02-20 17:50 반환
	 */
	static getCloseIntervalSecDate(date: Date, intervalSec: number) {
		const dateSec = dayjs(date).get("seconds");
		const roundedSec = Math.floor(dateSec / intervalSec) * intervalSec;

		return dayjs(date).set("seconds", roundedSec).toDate();
	}
}
