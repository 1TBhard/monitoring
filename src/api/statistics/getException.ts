import openWhatapAPI from "src/api/openWhatapAPI";
import { API_URL } from "src/const/API_URL";
import Exception from "src/type/Exception";
import ResponseRecords from "src/type/ResponseRecords";

interface GetExceptionParams {
	stime: number;
	etime: number;
}

export default async function getException({
	stime,
	etime,
}: GetExceptionParams) {
	const url = API_URL.STATISTICS.EXCEPTION.replace(
		":stime",
		String(stime)
	).replace(":etime", String(etime));

	return openWhatapAPI.get<unknown, ResponseRecords<Exception>>(url);
}
