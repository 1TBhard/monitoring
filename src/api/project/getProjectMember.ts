import openWhatapAPI from "src/api/openWhatapAPI";
import { API_URL } from "src/const/API_URL";

interface GetProjectMemberParam {
	projectCode: string;
}

export default async function getProjectMember({
	projectCode,
}: GetProjectMemberParam) {
	const url = API_URL.PROJECT.MEMBER_LIST.replace(":projectCode", projectCode);

	return openWhatapAPI.get(url);
}
