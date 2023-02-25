import Dashboard from "src/page/Dashboard";
import ThemeProvider from "src/component/main/ThemeProvider";
import WidgetDataProvider from "src/hook/WidgetDataProvider";
import { queryClient } from "src/hook/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "src/util/setTimezone";

function App() {
	return (
		<ThemeProvider>
			<WidgetDataProvider>
				<QueryClientProvider client={queryClient}>
					<Dashboard />
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</WidgetDataProvider>
		</ThemeProvider>
	);
}

export default App;
