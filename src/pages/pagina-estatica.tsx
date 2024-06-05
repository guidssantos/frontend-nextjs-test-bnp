/**
 * Página estática
 *
 * - Atualmente o conteúdo é gerado no momento em que a requisição é feita
 * - Você deve transformar essa página em uma página estática
 * - A página deve ser gerada no momento da build
 * - A página deve ser atualizada a cada 1 minuto
 */

import styles from '@/styles/lista.module.css';
import { ICity } from '@/types/city.d';
import API_URL from '@/utils/config';

interface ListaProps {
	cities: ICity[];
}

export default function Lista({cities}: ListaProps) {

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h2>Lista de cidades</h2>

				<div data-list-container>
					{cities.map((city: ICity) => (
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
		revalidate: 60
	}
	} catch (error){
		console.error(error);
		return{
			props:{
				cities: []
			},
			revalidate: 60,
		}
	}

}