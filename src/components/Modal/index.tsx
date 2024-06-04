import styles from './style.module.css';

type ModalProps = {
	children: React.ReactNode;
	title: string;
	isOpen: boolean;
	onClose?: (type: 'click' | 'esc', target: EventTarget) => void;
	onConfirm?: () => void;
	footer?: {
		hidden?: boolean;
		confirmText?: string;
		cancelText?: string;
	};
};

/* 
	Modal

	- Ao clicar no wrapper do modal, o modal deve ser fechado, porém esta ação deve ser ignorada caso o usuário clique em qualquer elemento dentro do modal
*/

// Solução

/*
	Adicionei o "onClick={(e) => e.stopPropagation()}" para evitar que cliques
	no conteúdo do modal sejam capazes de fechar o modal.
	Assim, o modal só fechará quando o usuário clicar diretamente no wrapper
	ou nos botões específicos que disparam o fechamento.
*/

export const Modal: React.FC<ModalProps> = ({ children, title, isOpen, ...props }) => {
	function handleCloseClick(e: React.MouseEvent) {
		props.onClose?.('click', e.target);
	}

	function handleConfirmClick(e: React.MouseEvent) {
		props.onConfirm?.();
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
		if (e.key === 'Escape') props.onClose?.('esc', e.target);
	}

	if (!isOpen) return null;

	return (
		<div data-modal-wrapper className={styles.wrapper} onClick={handleCloseClick} onKeyDown={handleKeyDown}>
			<div data-modal-container onClick={(e) => e.stopPropagation()}>
				<header data-modal-header>
					<h2>{title}</h2>

					<button data-modal-close onClick={handleCloseClick}>
						X
					</button>
				</header>

				{children}

				{!props.footer?.hidden && (
					<div data-modal-footer>
						<button data-modal-cancel onClick={handleCloseClick}>
							{props.footer?.cancelText ?? 'Cancelar'}
						</button>

						<button data-modal-confirm onClick={handleConfirmClick} data-type="confirm">
							{props.footer?.confirmText ?? 'Confirmar'}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
