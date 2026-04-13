export interface IRegisterForm {
	username: string
	email: string
	password: string
}

export interface IRegister {
	fullName: string
	email: string
	password: string
	confirmPassword: string
}

export interface ILoginResult {
	token: string
}

export interface IUserLoginInfo {
	Id: string
	FullName: string
	Email: string
	Username: string
	role: string
	AvatarUrl: string
	block: boolean
	PhoneNumber: string
}

export interface ILogin {
	email: string
	password: string
}