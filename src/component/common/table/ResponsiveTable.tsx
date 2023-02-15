import { Table, TableProps } from "antd";
import { useEffect, useRef, useState } from "react";

interface ResponsiveTableProps
	extends Omit<TableProps<object>, "pagination" | "columns"> {
	columns: TableProps<object>["columns"];
}

export default function ResponsiveTable({
	columns,
	dataSource,
	...restTableProps
}: ResponsiveTableProps) {
	const tableRef = useRef<HTMLDivElement>(null);

	const [tableHeight, setTableHeight] = useState<number | string>(
		"max-content"
	);

	useEffect(() => {
		function updateTableSize() {
			if (tableRef.current) {
				const tableBodyRect = tableRef.current.getBoundingClientRect();
				setTableHeight(tableBodyRect.height);
			}
		}

		updateTableSize();
		window.addEventListener("resize", updateTableSize);

		return () => window.removeEventListener("resize", updateTableSize);
	}, []);

	return (
		<div ref={tableRef}>
			<Table
				columns={columns}
				dataSource={dataSource}
				pagination={{
					position: ["topRight"],
				}}
				scroll={{ y: tableHeight }}
				{...restTableProps}
			/>
		</div>
	);
}
