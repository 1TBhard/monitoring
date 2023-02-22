import dayjs from "dayjs";
import UtilNumber from "src/util/UtilNumber";

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

	/**
	 * @description Date를 원하는 분 만큼 뺀 Date를 반환
	 */
	static getDateBeforeMinutes(date: Date, minutes: number) {
		return dayjs(date).add(-minutes, "minutes").toDate();
	}

	/**
	 * @description startDate ~ endDate 를 sec만큼 나눌 때의 [{stime, etime}] 리스트 반환
	 */
	static getStimeEtimeBySecInterval(
		startDate: Date,
		endDate: Date,
		sec: number
	): { stime: number; etime: number }[] {
		const start = dayjs(startDate);
		const end = dayjs(endDate).add(-sec, "seconds");

		const result = [];
		for (
			let curStart = start;
			!curStart.isAfter(end);
			curStart = curStart.add(sec, "seconds")
		) {
			result.push({
				stime: curStart.toDate().getTime(),
				etime: dayjs(curStart).add(sec, "seconds").toDate().getTime(),
			});
		}

		return result;
	}

	/**
	 * @description 밀리세컨드를 초로 변환한 String 반환
	 */
	static msToSecString(ms: number | string) {
		return `${UtilNumber.toLocaleString(Math.round(Number(ms) / 10) / 100)}s`;
	}
}
