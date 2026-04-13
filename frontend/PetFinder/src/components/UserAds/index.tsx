import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import http_common from '../../http_common'
import type { IAd } from '../../interfaces/ad'

export default function UserAds() {
	const auth = useAppSelector(store => store.auth.user)
	const [allAds, setAllAds] = useState<IAd[]>()
	const fetchUserAds = async () => {
		try {
			const response = await axios.get<IAd[]>(
				'http://localhost:5005/api/Ad/GetAllAsync'
			)
			const ads = response.data
			const filtered = ads.filter(ad => ad.user.id === Number(auth?.Id))
			setAllAds(filtered)
		} catch (error) {
			console.error('Помилка при завантаженні оголошень:', error)
		}
	}
	useEffect(() => {
		fetchUserAds()
	}, [fetchUserAds])
	const userAds = allAds?.filter(ad => ad.user.id === Number(auth?.Id))
	const handleChangeStatus = async (id: number, currentStatus: boolean) => {
		try {
			const newStatus = !currentStatus

			await http_common.get(`api/Ad/ChangeStatus`, {
				params: {
					id: id,
					isLost: newStatus,
				},
			})

			fetchUserAds() // оновити список
		} catch (error) {
			console.error('Помилка при зміні статусу:', error)
		}
	}

	const handleDeleteAd = async (id: number) => {
		if (confirm('Ви впевнені, що хочете видалити оголошення?')) {
			await http_common.delete(`api/Ad/Delete`, {
				params: {
					id: id,
				},
			})
			fetchUserAds()
		}
	}
	return (
		<>
			{userAds?.map(ad => (
				<div
					key={ad.id}
					className='border-2 border-[#C4C9D4] p-4 rounded-xl mb-4 flex items-center justify-between'
				>
					<Link to={`/ad/${ad.id}`}>
						<div className='flex gap-4 font-display items-center hover:scale-105 transition-all duration-300'>
							<img
								src={ad.imageUrl}
								alt='ads img'
								className='w-[200px] h-[200px] rounded-xl '
							/>
							<div className='flex flex-col gap-2 items-start'>
								<h2 className='text-lg font-semibold'>{ad.title}</h2>
								<p className=''>{ad.description}</p>
								<span className='text-lg '>
									Status: {ad.isLost ? 'Lost' : 'Found'}
								</span>
							</div>
						</div>
					</Link>
					<div className='flex gap-2 font-display'>
						<button
							onClick={() => handleChangeStatus(ad.id, ad.isLost)}
							className='bg-[#393E46] text-white py-2 px-4 rounded-[50px] font-display text-lg uppercase font-bold  w-full cursor-pointer hover:bg-[#222831] transition-all duration-300'
						>
							Change Status
						</button>
						<button
							onClick={() => handleDeleteAd(ad.id)}
							className='bg-[#393E46] text-white py-2 px-4 rounded-[50px] font-display text-lg uppercase font-bold w-full cursor-pointer hover:bg-[#222831] transition-all duration-300'
						>
							Delete
						</button>
					</div>
				</div>
			))}
		</>
	)
}
