import { AVG_REPONSE_TIME_CHART_MAX_DATA_NUMBER } from "src/const/STATISTICS";
import UtilLocalstorage from "src/util/UtilLocalStorage";

interface DataStatics {
	value: number;
	date: Date;
}

const LOCAL_STORAGE_AVG_RESPONSE_TIME_KEY = "AVG_RESPONSE_TIME";

class utilLocalstorageAvgResponseTime extends UtilLocalstorage<DataStatics> {}

const UtilLocalstorageAvgResponseTime = new utilLocalstorageAvgResponseTime({
	key: LOCAL_STORAGE_AVG_RESPONSE_TIME_KEY,
	limit: AVG_REPONSE_TIME_CHART_MAX_DATA_NUMBER,
});

export default UtilLocalstorageAvgResponseTime;
