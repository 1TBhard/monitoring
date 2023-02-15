import { ConfigProvider } from "antd";
import { ReactNode } from "react";

const theme = {
	token: {
		colorPrimary: "##19a0e5",
		colorWarn: "#ffb902",
		colorSuccess: "#80ba01",
		colorError: "#f25022",
		colorInfo: "#19a0e5",
		colorTextBase: "#4f4f4f",
	},
};

export default function ThemeProvider({ children }: { children: ReactNode }) {
	return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}
