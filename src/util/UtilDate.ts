import dayjs from "dayjs";

export default class UtilDate {
	static dateBumberToHHmm(dateNumber: number) {
		const day = dayjs(new Date(dateNumber));

		return day.format("HH:mm");
	}

	static getTodayStimeEtime() {
		const stime = dayjs().startOf("day").toDate().getTime();
		const etime = dayjs().endOf("day").toDate().getTime();

		return { stime, etime };
	}
}
