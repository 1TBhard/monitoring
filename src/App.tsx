import Dashboard from "src/page/Dashboard";
import ThemeProvider from "src/component/main/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "src/hook/store";
import "src/util/setTimezone";

function App() {
	return (
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<Dashboard />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
