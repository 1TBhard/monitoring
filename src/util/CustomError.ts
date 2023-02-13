/**
 * @description 커스텀 에러 클래스
 */
class CustomError extends Error {
	constructor({
		errorResponse,
		customErrorMessage = "알 수 없는 에러가 발생하였습니다.",
	}: {
		errorResponse?: any;
		customErrorMessage?: string;
	}) {
		const message = errorResponse?.message ?? customErrorMessage;

		super(message);
	}
}

export default CustomError;
