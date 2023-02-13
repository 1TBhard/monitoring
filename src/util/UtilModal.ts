import { Modal, ModalFuncProps } from "antd";

interface ErrorModalProps {
	title?: ModalFuncProps["title"];
	content: Required<ModalFuncProps["title"]>;
}

export const errorModal = ({
	title = "오류가 발생했습니다.",
	content,
}: ErrorModalProps) =>
	Modal.error({
		title,
		content,
		okText: "닫기",
	});

export const infoModal = ({
	title,
	content,
	okText = "확인",
	...restModalFunProps
}: ModalFuncProps) =>
	Modal.info({
		title,
		content,
		okText,
		...restModalFunProps,
	});

export const warnConfirmModal = ({
	title,
	content,
	okText = "예",
	cancelText = "취소",
	onOk,
	...restModalProps
}: ModalFuncProps) =>
	Modal.confirm({
		title,
		content,
		okText,
		cancelText,
		onOk,
		okType: "danger",
		...restModalProps,
	});

export const confirmModal = ({
	title,
	content,
	okText = "예",
	cancelText = "취소",
	onOk,
	...restModalProps
}: ModalFuncProps) =>
	Modal.confirm({
		title,
		content,
		okText,
		cancelText,
		onOk,
		okType: "primary",
		...restModalProps,
	});
