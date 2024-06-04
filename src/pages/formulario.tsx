/**
 * Formulário
 *
 * - Primeiramente vá até /src/pages/api/users/create.ts e implemente a API
 * - Deve ser implementado utilizando a lib react-hook-form
 * - O formulário deve ter os seguintes campos: nome, e-mail
 * - Os dois campos são obrigatórios e precisam de validação
 * - Ao dar 'submit', deve ser feito uma request para /api/users/create
 * - Lide com os possíveis erros
 */

import {SubmitHandler, useForm} from 'react-hook-form'
import styles from '@/styles/formulario.module.css';
import { IUserCreate } from '@/types/user';
import { useState } from 'react';

export default function Form() {

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const {register, handleSubmit, formState: {errors}, reset } = useForm<IUserCreate>();
	
	 const onSubmit: SubmitHandler<IUserCreate> = async function(data: IUserCreate) {
		setIsSubmitting(true);
		try{
			const response = await fetch('api/users/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			if(!response.ok) {
				throw new Error('Erro ao enviar os dados');
			} else{
				alert('Dados enviados com sucesso!');
				reset()
			}
		} catch (error: any) {
			console.error('Erro:', error.message)
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input type="text" placeholder="Name" {...register('name', {required: 'Nome é obrigatório', pattern: {value: /^[A-Za-z]+$/, message: 'O nome deve conter apenas letras'}  })} />
						{errors.name && <span>{errors.name.message}</span>}
					<input type="email" placeholder="E-mail" {...register('email', {required: 'E-mail é obrigatório'})} />
						{errors.email && <span>{errors.email.message}</span>}
					<button type="submit" data-type="confirm" disabled={isSubmitting} >
						 {isSubmitting ? 'Enviando...' : 'Enviar'}
					</button>
				</form>
			</div>
		</div>
	);
}
