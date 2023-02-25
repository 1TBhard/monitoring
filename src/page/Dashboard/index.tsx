import DashboardContent from "src/page/Dashboard/DashboardContent";
import { WidgetDataContext } from "src/hook/WidgetDataProvider";

export default function Dashboard() {
	return (
		<WidgetDataContext.Consumer>
			{(widgetData) => (
				<DashboardContent title={widgetData.project.data.name} />
			)}
		</WidgetDataContext.Consumer>
	);
}
