import { Spin, SpinProps } from "antd";

interface ErrorWrapperProps
	extends Omit<SpinProps, "indicator" | "tip" | "spinning"> {
	isError?: boolean;
	errorMessage: string;
}

export default function ErrorWrapper({
	isError = false,
	errorMessage,
	...restProps
}: ErrorWrapperProps) {
	return (
		<Spin
			spinning={isError}
			indicator={<></>}
			tip={errorMessage}
			{...restProps}
		/>
	);
}
