import CustomError from "src/util/CustomError";

export interface ApiQueueItem {
	type:
		| "PROJECT_INFO"
		| "ACTIVATE_USER"
		| "SQL_ERROR"
		| "AVG_RESPONSE_TIME"
		| "INFOMATIC";
	params?: object;
	body?: object;
}

export class ApiQueue {
	queue: ApiQueueItem[];
	queueMaxLength: number; // 큐 최대 길이
	workByInterval: number; // interval 당 처리할 수
	invervalMs: number; // interval MS
	interverObject?: NodeJS.Timeout; // interval 객체
	reducer: (apiCall: ApiQueueItem) => void; // 리듀서(행동을 결정)

	constructor({
		queueMaxLength,
		workByInterval,
		invervalMs,
		reducer,
	}: {
		queueMaxLength: number;
		workByInterval: number;
		invervalMs: number;
		reducer: (apiCall: ApiQueueItem) => void;
	}) {
		this.queue = [];
		this.queueMaxLength = queueMaxLength;
		this.workByInterval = workByInterval;
		this.invervalMs = invervalMs;
		this.reducer = reducer;
	}

	isLimitLength() {
		return this.queue.length >= this.queueMaxLength;
	}

	isEmpty() {
		return this.queue.length === 0;
	}

	push(apiCall: ApiQueueItem) {
		if (this.isLimitLength()) {
			throw new CustomError({
				customErrorMessage: `ApiQueue가 최대 길이 ${this.queueMaxLength}를 벗어남`,
			});
		}
		this.queue.push(apiCall);
	}

	/**
	 * @description queue에선 pop된 요소가 reducer에 의해 실행
	 */
	private pop() {
		if (this.isEmpty()) {
			return;
		}

		const work = this.queue.pop()!;

		this.reducer(work);
	}

	/**
	 * @description workByInterval 만큼 큐를 비운다.
	 */
	private flush() {
		for (let i = 0; i < this.workByInterval; i++) {
			this.pop();
		}
	}

	startFlush() {
		this.flush();

		this.interverObject = setTimeout(() => {
			this.flush();
			this.interverObject = setTimeout(
				() => this.flush.call(this),
				this.invervalMs
			);
		}, this.invervalMs);
	}

	stopFlush() {
		clearTimeout(this.interverObject);
	}

	clearFlush() {
		clearTimeout(this.interverObject);
		this.queue = [];
	}
}
