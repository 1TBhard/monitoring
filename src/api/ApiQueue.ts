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
	remainRetry: number;
}

export class ApiQueue {
	queue: ApiQueueItem[];
	queueMaxLength: number; // 큐 최대 길이
	workByInterval: number; // interval 당 처리할 수
	intervalMs: number; // interval MS
	popSchedule?: NodeJS.Timeout; // 큐를 비우는 Timeout 객체
	pushShedule?: NodeJS.Timeout; // 큐를 채우는 Timeout 객체
	apiCallList: ApiQueueItem[]; // interval 하게 동작할 apiCall 리스트
	reducer: (apiCall: ApiQueueItem) => void; // 리듀서(행동을 결정)
	workingKeySet!: Set<string>; // 현재 동작중인 apiCall 리스트, api 호출 순서를 보장하기 위해 사용

	constructor({
		queueMaxLength,
		workByInterval,
		invervalMs,
		apiCallList,
		reducer,
	}: {
		queueMaxLength: number;
		workByInterval: number;
		invervalMs: number;
		apiCallList: ApiQueueItem[];
		reducer: (apiCall: ApiQueueItem) => Promise<void>;
	}) {
		this.queue = [];
		this.queueMaxLength = queueMaxLength;
		this.workByInterval = workByInterval;
		this.intervalMs = invervalMs;
		this.apiCallList = apiCallList;
		this.reducer = reducer;
		this.workingKeySet = new Set();
	}

	/**
	 * @description 큐의 최대 아이템 수 이상 여부를 반환
	 */
	private isLimitLength() {
		return this.queue.length >= this.queueMaxLength;
	}

	/**
	 * @description queue가 비었는지 여부를 반환
	 */
	isEmpty() {
		return this.queue.length === 0;
	}

	/**
	 * @description ApiQueueItem 을 queue 에 삽입한다.
	 */
	private push(
		{ type, body, params, remainRetry }: ApiQueueItem,
		pushFirst: boolean = false
	) {
		if (this.isLimitLength()) {
			const msg = `ApiQueue가 최대 길이 ${this.queueMaxLength}를 벗어남`;
			console.error(msg);
			return;
		}

		if (pushFirst) {
			this.queue.unshift({
				type,
				body,
				params,
				remainRetry,
			});
		} else {
			this.queue.push({ type, body, params, remainRetry });
		}
	}

	/**
	 * @description queue에선 pop된 요소가 reducer에 의해 실행
	 */
	unshift(apiCall: ApiQueueItem) {
		if (apiCall.remainRetry <= 0) return;

		this.push(apiCall, true);
	}

	/**
	 * @description queue에선 pop된 요소가 reducer에 의해 실행
	 */
	private async pop() {
		if (this.isEmpty()) {
			return;
		}

		const work = this.queue.pop()!;

		if (this.isWorking(work.type)) {
			console.info(`${work.type}은 이미 실행중입니다.`);
			this.unshift(work);
			return;
		}

		this.addWorking(work.type);
		await this.reducer(work);
		this.removeWorking(work.type);
	}

	/**
	 * @description 지정한 apiCallList들을 queue에 inverval 하게 삽입
	 */
	private startPushInterval() {
		this.apiCallList.forEach((apiCall) => {
			this.push(apiCall);
		});

		const pushInterval = () => {
			if (this.isLimitLength()) {
				throw new CustomError({
					customErrorMessage: `ApiQueue가 최대 길이 ${this.queueMaxLength}를 벗어남`,
				});
			}

			this.apiCallList.forEach((apiCall) => {
				this.push(apiCall);
			});
			this.pushShedule = setTimeout(pushInterval, this.intervalMs);
		};

		this.pushShedule = setTimeout(pushInterval, this.intervalMs);
	}

	/**
	 * @description workByInterval 만큼 큐를 비운다.
	 */
	private flush() {
		for (let i = 0; i < this.workByInterval; i++) {
			this.pop();
		}
	}

	/**
	 * flush를 스케줄로 등록한다.
	 */
	private startFlush() {
		const popInterval = () => {
			this.flush();
			this.popSchedule = setTimeout(popInterval, this.intervalMs);
		};

		this.flush();
		this.popSchedule = setTimeout(popInterval, this.intervalMs);
	}

	stop() {
		clearTimeout(this.popSchedule);
		clearTimeout(this.pushShedule);
	}

	start() {
		this.startPushInterval();
		this.startFlush();
	}

	clear() {
		this.stop();
		this.queue = [];
		this.apiCallList = [];
	}

	isWorking(type: ApiQueueItemType) {
		return this.workingKeySet.has(type);
	}

	addWorking(type: ApiQueueItemType) {
		this.workingKeySet.add(type);
	}

	removeWorking(type: ApiQueueItemType) {
		this.workingKeySet.delete(type);
	}
}
