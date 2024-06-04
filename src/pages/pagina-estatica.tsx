/**
 * Página estática
 *
 * - Atualmente o conteúdo é gerado no momento em que a requisição é feita
 * - Você deve transformar essa página em uma página estática
 * - A página deve ser gerada no momento da build
 * - A página deve ser atualizada a cada 1 minuto
 */

import { useState } from 'react';

import styles from '@/styles/lista.module.css';
import { ICity } from '@/types/city.d';
import API_URL from '@/utils/config';

export default function Lista({cities}: any) {
	const [list, _] = useState<Array<ICity>>(cities || []);



	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h2>Lista de cidades</h2>

				<div data-list-container>
					{list.map((city) => (
						<div data-list-item key={city.id}>
							{city.name}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export async function getStaticProps(){
	console.log('test revalidate')
	try{

	const response = await fetch(`${API_URL}/api/cities/10`);
	const data = await response.json();

	if(!response.ok){
		console.error('Erro ao obter os dados');
		return{
			notFound: true
		}
	}

	return {
		props: {
			cities: data,
		},
		revalidate: 2
	}
	} catch (error){
		console.error(error);
		return{
			props:{
				cities: []
			},
			revalidate: 2,
		}
	}

}