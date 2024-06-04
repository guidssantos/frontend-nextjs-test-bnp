export interface IUser {
	id: number;
	name: string;
	email: string;
}

export type IUserCreate = {
	name: string;
	email: string;
};
