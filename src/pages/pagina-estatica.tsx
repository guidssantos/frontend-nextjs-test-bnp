/**
 * Página estática
 *
 * - Atualmente o conteúdo é gerado no momento em que a requisição é feita
 * - Você deve transformar essa página em uma página estática
 * - A página deve ser gerada no momento da build
 * - A página deve ser atualizada a cada 1 minuto
 */

// Solução

/* A Lista foi atualizada para receber as cities como props, foi utilizado
o getStaticProps para buscar os dados durante o momento da build, foi realizado
o tratamento de erros e implementado a funcionalidade de atualização */

import styles from '@/styles/lista.module.css';
import { ICity } from '@/types/city.d';
import API_URL from '@/utils/config';
import { useEffect, useState } from 'react';

interface ListaProps {
	cities: ICity[];
}

export default function Lista({cities}: ListaProps) {

	const [list, setList] = useState(cities);

	async function getList() {
		try {
		const response = await fetch('/api/cities/10');
		const newData = await response.json();

		if (!response.ok) throw new Error('Erro ao obter os dados');

			setList(newData);
		} catch (error) {
			console.error(error);
		}
	}

  useEffect(() => {
	const interval = setInterval(() => {
		getList();
	}, 60000)
	return () => clearInterval(interval);
  }, [])

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h2>Lista de cidades</h2>

				<div data-list-container>
					{list.map((city: ICity) => (
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
		const response = await fetch(`${API_URL}/api/cities/10`, {next: {revalidate: 60}});
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
		}
	}
	} catch (error){
		console.error(error);
		return{
			props:{
				cities: []
			},
		}
	}

}