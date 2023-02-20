import { AVG_REPONSE_TIME_CHART_MAX_DATA_NUMBER } from "src/const/STATISTICS";
import UtilLocalstorage from "src/util/UtilLocalStorage";

interface TpsStatics {
	value: number;
	date: Date;
}

const LOCAL_STORAGE_TPS_KEY = "TPS";

class utilLocalstoragetTps extends UtilLocalstorage<TpsStatics> {}

const UtilLocalstorageAvgResponseTime = new utilLocalstoragetTps({
	key: LOCAL_STORAGE_TPS_KEY,
	limit: AVG_REPONSE_TIME_CHART_MAX_DATA_NUMBER,
});

export default UtilLocalstorageAvgResponseTime;
