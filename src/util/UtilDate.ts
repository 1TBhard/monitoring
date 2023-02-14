import dayjs from "dayjs";

export default class UtilDate {
	static dateBumberToHHmm(dateNumber: number) {
		const day = dayjs(new Date(dateNumber));

		return day.format("HH:mm");
	}
}
