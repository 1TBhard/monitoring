import { LOADING } from "src/const/MESSAGE";
import { Spin, SpinProps } from "antd";

interface CustomLoadingProps extends Omit<SpinProps, "indicator" | "tip"> {}

export default function CustomLoading({ ...restProps }: CustomLoadingProps) {
	return <Spin tip={LOADING} {...restProps} />;
}
