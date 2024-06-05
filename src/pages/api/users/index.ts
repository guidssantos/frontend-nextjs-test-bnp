/**
 * @api {get} /api/users Read list
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que retorne uma lista de usuários
 * - A request deve receber apenas o método GET
 * - A lista deve conter pelo menos 2 usuários
 * - Cada usuário deve ter um id, nome e email
 * - Utilize a interface IUser para tipar os dados
 */

// Solução

/* O problema foi solucionado atualizando a função para retornar uma lista
de usuários predefinida. Foi adicionado uma verificação para garantia que a 
rota só responda a requisições GET, retornando status 405 caso contrário.
E foi definido o restante solicitado pelo exercício */

import { NextApiRequest, NextApiResponse } from 'next/types';

import { IUser } from '@/types/user.d';

export default (req: NextApiRequest, res: NextApiResponse) => {
	if(req.method !== 'GET') {
		return res.status(405).json({message: "Method Not Allowed"})
	}
	const users: IUser[] = [
		{
			id: 1,
			name: 'John Doe',
			email: 'johndoe@example.com'
		},
		{
			id: 2,
			name: 'Jane Doe',
			email: 'janedoe@example.com'
		},
		{
			id: 3,
			name: 'Alex',
			email: 'alex@example.com'
		},
		{
			id: 4,
			name: 'Bob',
			email: 'bob@example.com'
		}
	];

	return res.status(200).json(users);
};
