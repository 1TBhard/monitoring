import { MAX_RETRY_API_QUEUE_ITEM } from "src/const/STATISTICS";
import CustomError from "src/util/CustomError";

export type ApiQueueItemType =
	| "PROJECT_INFO"
	| "TODAY_ACTIVATE_USER"
	| "YESTERDAY_ACTIVATE_USER"
	| "TPS"
	| "SQL_ERROR"
	| "AVG_RESPONSE_TIME"
	| "INFOMATIC";

export interface ApiQueueItem {
	type: ApiQueueItemType;
	params?: object;
	body?: object;
	retry?: number;
	maxRetry?: number;
}

export class ApiQueue {
	queue: ApiQueueItem[];
	queueMaxLength: number; // 큐 최대 길이
	workByInterval: number; // interval 당 처리할 수
	intervalMs: number; // interval MS
	popSchedule?: NodeJS.Timeout; // 큐를 비우는 객체
	pushShedule?: NodeJS.Timeout; // 큐를 채우는 객체
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
		this.intervalMs = invervalMs;
		this.reducer = reducer;
	}

	isLimitLength() {
		return this.queue.length >= this.queueMaxLength;
	}

	isEmpty() {
		return this.queue.length === 0;
	}

	push({
		type,
		body,
		params,
		retry = 0,
		maxRetry = MAX_RETRY_API_QUEUE_ITEM,
	}: ApiQueueItem) {
		if (this.isLimitLength()) {
			throw new CustomError({
				customErrorMessage: `ApiQueue가 최대 길이 ${this.queueMaxLength}를 벗어남`,
			});
		}
		this.queue.push({ type, body, params, retry, maxRetry });
	}

	unshift(apiCall: ApiQueueItem) {
		if (apiCall.retry === apiCall.maxRetry) return;

		this.queue.unshift(apiCall);
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

	initPushSchedule(apiCallList: ApiQueueItem[]) {
		this.queue.push(...apiCallList);

		const pushInterval = () => {
			if (this.isLimitLength()) {
				throw new CustomError({
					customErrorMessage: `ApiQueue가 최대 길이 ${this.queueMaxLength}를 벗어남`,
				});
			}

			this.queue.push(...apiCallList);
			this.pushShedule = setTimeout(pushInterval, this.intervalMs);
		};

		this.pushShedule = setTimeout(pushInterval, this.intervalMs);
	}

	/**
	 * @description workByInterval 만큼 큐를 비운다.
	 */
	flush() {
		for (let i = 0; i < this.workByInterval; i++) {
			this.pop();
		}
	}

	/**
	 * flush를 스케줄로 등록한다.
	 */
	startFlush() {
		const popInterval = () => {
			this.flush();
			this.popSchedule = setTimeout(popInterval, this.intervalMs);
		};

		this.flush();
		this.popSchedule = setTimeout(popInterval, this.intervalMs);
	}

	stopFlush() {
		clearTimeout(this.popSchedule);
		clearTimeout(this.pushShedule);
	}

	clearFlush() {
		this.stopFlush();
		this.queue = [];
	}
}
