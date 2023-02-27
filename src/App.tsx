import Dashboard from "src/page/Dashboard";
import ThemeProvider from "src/component/main/ThemeProvider";
import WidgetDataProvider from "src/hook/WidgetDataProvider";
import "src/util/setTimezone";

function App() {
	return (
		<ThemeProvider>
			<WidgetDataProvider>
				<Dashboard />
			</WidgetDataProvider>
		</ThemeProvider>
	);
}

export default App;
