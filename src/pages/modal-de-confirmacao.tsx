/**
 * Modal de confirmação
 *
 * - Crie um component para o modal de confirmação
 * - Utilize o código abaixo como base
 * - O modal deve ser aberto ao clicar no botão "Abrir modal de confirmação"
 * - O título deve ser "Confirmação"
 * - O conteudo deve ser dinâmico
 */


// Solução

/*
	Reutilizei o componente "Modal" para o modal de confirmação.
	Modifiquei o modo que são criadas as funções de fechamento
	e de confirmação, também o modo que é renderizado
	o conteúdo para diferenciar do modal anterior.

*/

import { useState } from 'react';

import styles from '@/styles/modal.module.css';
import { Modal } from '@/components/Modal';

export default function Home() {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const handleModalConfirm = () => {
		setModalIsOpen(false);
		alert('Confirmado com sucesso!');
	}

	const handleModalClose = () => {
		setModalIsOpen(false);
	}

	return (
		<>
			<main className={styles.container}>
				<button type="button" onClick={() => setModalIsOpen(true)}>
					Abrir modal de confirmação
				</button>
			</main>

			{/* Renderizar modal de confirmação */}

			<Modal
				isOpen={modalIsOpen}
				title="Confirmação"
				onClose={handleModalClose}
				onConfirm={handleModalConfirm}
				
			>
				<div data-modal-content className={styles['modal-form']}>
					<p>Tem certeza que deseja realizar esta ação?</p>
				</div>
			</Modal>
		</>
	);
}
