import LoadingState from "src/type/LoadingState";

interface WithLoadingState<T> {
	data: T;
	state: LoadingState;
}

export default WithLoadingState;
