abstract class UtilLocalstorage<T> {
	key: string;
	limit: number;

	constructor({ key, limit }: { key: string; limit: number }) {
		this.key = key;
		this.limit = limit;
	}

	count() {
		return this.get().length;
	}

	isLimit() {
		return this.count() > this.limit;
	}

	isEmpty() {
		return !localStorage.getItem(this.key)?.length;
	}

	add(data: T) {
		const currentList = this.get();
		const nextList = [...currentList, data];

		if (this.isLimit()) {
			nextList.splice(0, this.count() - this.limit);
		}

		localStorage.setItem(this.key, JSON.stringify(nextList));
	}

	get() {
		if (!this.isEmpty()) {
			return JSON.parse(localStorage.getItem(this.key)!) as T[];
		}

		return [];
	}
}

export default UtilLocalstorage;
