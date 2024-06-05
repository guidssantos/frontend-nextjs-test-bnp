/**
 * Context Api
 *
 * - Criar um contexto para exibir mensagens de sucesso e erro
 * - Criar um componente para exibir as mensagens
 * - Criar um hook para disparar e consumir as mensagens
 * - Disparar as mensagens a partir dos botões abaixo
 */

// Solução

/* O contexto foi implementado para gerenciar as mensagens,
 criei funções para adicionar mensagens e também remove-las
depois de um tempo.  
 */

import styles from '@/styles/context-api.module.css';
import { ToastMessage } from '@/components/ToastMessage';
import {  useMessage } from '@/contexts/MessageContext';
import { useEffect } from 'react';

export default function ContextApi() {

	const { messages, addMessage, removeMessage } = useMessage()

	function handleSuccessButtonClick() {
		addMessage({
			id: String(Date.now()),
			message: 'Mensagem de sucesso',
			type: 'success'
		})
	}

	function handleErrorButtonClick() {
		addMessage({
			id: String(Date.now()),
			message: 'Mensagem de erro',
			type: 'error'
		})
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			messages.forEach((message) => {
				removeMessage(message.id)
			});
		}, 2000);

		return () => clearTimeout(timer)
	}, [messages, removeMessage])

	return (
		<>
			<div className={styles.container}>
				<button type="button" onClick={handleSuccessButtonClick}>
					Disparar mensagem de sucesso
				</button>
				<button type="button" onClick={handleErrorButtonClick}>
					Disparar mensagem de erro
				</button>
			</div>

			<div className={styles['toast-container']}>
				{messages.map((message) => (
					<ToastMessage key={message.id} content={message} />
				))}
			</div>
		</>
	);
}
