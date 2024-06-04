
import { IToastMessage } from '@/types/toast-message.d';

import styles from './style.module.css';
import { useMessage } from '@/contexts/MessageContext';

type ToastMessageProps = {
	content: IToastMessage;
};

export const ToastMessage: React.FC<ToastMessageProps> = ({ content: data }) => {
	const {removeMessage} = useMessage()
	const handleRemoveMessage = () => {
		removeMessage(data.id)
	}

	return (
		<div className={styles.container} data-toast-type={data.type} data-toast-id={data.id}>
			<span data-content>{data.message}</span>

			<span data-close onClick={handleRemoveMessage} >╳</span>
		</div>
	);
};
