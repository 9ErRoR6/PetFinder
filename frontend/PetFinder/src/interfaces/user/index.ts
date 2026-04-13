export interface IUser {
	id: string | number
	fullName: string
	email: string
	phoneNumber: string
	avatarUrl: string
}

export interface IUserEdit {
	email: string
	phoneNumber: string
	fullName: string
	password: string
	imageUrl: string
}
