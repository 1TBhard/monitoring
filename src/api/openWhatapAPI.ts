import axios from "axios";
import CustomError from "src/util/CustomError";

const OPEN_API_HEADERS = {
	"x-whatap-pcode": process.env.REACT_APP_DEMO_PROJECT_CODE,
	"x-whatap-token": process.env.REACT_APP_DEMO_PROJECT_API_TOCKEN,
};

const openWhatapAPI = axios.create({
	headers: OPEN_API_HEADERS,
});

openWhatapAPI.interceptors.request.use(
	(config) => config,
	(error) =>
		Promise.reject(
			new CustomError({
				errorResponse: error,
				customErrorMessage: "잘못된 request 요청",
			})
		)
);

openWhatapAPI.interceptors.response.use(
	(response) => response,
	(error) =>
		Promise.reject(
			new CustomError({
				errorResponse: error,
				customErrorMessage: "잘못된 reponse 응답",
			})
		)
);

export default openWhatapAPI;
