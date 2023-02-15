import { Drawer, DrawerProps } from "antd";

export interface CustomDrawerProps
	extends Omit<DrawerProps, "title" | "onClose"> {
	title?: string;
	onClose: DrawerProps["onClose"];
}

export default function CustomDrawer({
	title,
	onClose,
	...restProps
}: CustomDrawerProps) {
	return (
		<Drawer
			title={title}
			contentWrapperStyle={{
				width: "max-content",
			}}
			bodyStyle={{
				maxWidth: "80vw",
			}}
			placement='right'
			onClose={onClose}
			closable={false}
			{...restProps}
		/>
	);
}
