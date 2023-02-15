import { isEqual } from "lodash";

export default class UtilList {
	static isEqual(arr1: any[], arr2: any[]) {
		return arr1.every((item, index) => {
			if (typeof item === "object") {
				return isEqual(item, arr2[index]);
			}
			return item === arr2[index];
		});
	}
}
