export interface IAd {
	id: number
	title: string
	description: string
	animalType: {
        id: number
        name: string
    }
    color: string
    isLost: boolean
	latitude: number
    longitude: number
	imageUrl: string
    date: Date
	user: {
		id: number
		fullName: string
		phoneNumber: string | null
		avatarUrl: string
		userName: string
		email: string
	}
}
export interface AdFilters {
	animalType?: string;
	color?: string;
	isLost?: boolean;
	search?: string;
	recentOnly?: boolean;
}
export interface IaddAd {
	title: string
	description: string
	animalType: string
	color: string
	isLost: boolean
	latitude: number
	longitude: number
	imageUrl: string
}
