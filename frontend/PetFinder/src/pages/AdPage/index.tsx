import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import email_icon from '../../assets/email_icon.svg'
import location_icon from '../../assets/location_icon.svg'
import phone_icon from '../../assets/phone_icon.svg'
import Footer from '../../components/footer'
import Navbar from '../../components/navbar'
import RelatedAds from '../../components/RelatedAds'
import type { IAd } from '../../interfaces/ad'
const containerStyle = {
	width: '730px',
	height: '400px',
}
export default function AdPage() {
	const { id } = useParams<{ id: string }>()
	const [ad, setAd] = useState<IAd>()

	useEffect(() => {
		axios
			.get<IAd>(`http://localhost:5005/api/Ad/GetByAsync?id=${id}`)
			.then(response => {
				const ad = response.data
				setAd(ad)
			})
	}, [setAd])
	const lat = Number(ad?.latitude) || 0
	const lng = Number(ad?.longitude) || 0

	const [street, setStreet] = useState({
		street: '',
		city: '',
		state: '',
		country: '',
	})

	useEffect(() => {
		const fetchAddress = async () => {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
			)
			const data = await response.json()
			if (data && data.address) {
				setStreet({
					street: data.address.road || '',
					city:
						data.address.city ||
						data.address.town ||
						data.address.village ||
						'',
					state: data.address.state || '',
					country: data.address.country || '',
				})
			} else {
				setStreet({
					street: 'Loading...',
					city: 'Loading...',
					state: 'Loading...',
					country: 'Loading...',
				})
			}
		}

		fetchAddress()
	}, [lat, lng])

	return (
		<>
			<Navbar />
			<div className='w-[1300px] flex flex-col  gap-17.5 mx-auto mt-25'>
				<div className='w-full flex flex-row gap-22'>
					<div className='w-[400px] h-[500px]'>
						<img
							src={ad?.imageUrl}
							alt='ad'
							className='w-full h-full object-cover rounded-lg'
						/>
					</div>
					<div>
						<p className='text-5xl uppercase text-[#222831] font-bold'>
							{ad?.title}
						</p>
						<div className='flex flex-col items-start pt-17 gap-9'>
							<p className='text-4xl uppercase font-semibold  text-[#222831]'>
								About
							</p>
							<p className='text-3xl w-full text-left border-b-2 border-[#C4C9D4] pb-4 font-semibold text-[#222831]'>
								Type: {ad?.animalType.name}
							</p>
							<p className='text-3xl w-full text-left border-b-2 border-[#C4C9D4] pb-4 font-semibold text-[#222831]'>
								Color: {ad?.color}
							</p>
						</div>
					</div>
				</div>
				<div className='w-full flex flex-row gap-22 items-end'>
					<div className='flex flex-col gap-8 items-start'>
						<p className='text-5xl uppercase font-bold text-[#222831]'>
							Description
						</p>
						<p className='text-2xl w-[740px] h-[400px] px-18.5 py-9.5 rounded-[50px] text-left border-4 border-[#C4C9D4] text-[#222831]'>
							{ad?.description} Lorem ipsum dolor sit amet consectetur
							adipisicing elit. Aspernatur ex doloribus accusantium, nesciunt
							similique ullam modi a quos repellat animi repudiandae quisquam
							aperiam hic consequatur ratione debitis quo mollitia cum, fugiat
							perspiciatis, explicabo nisi numquam? Fugiat unde facere
							distinctio culpa laudantium. Soluta aperiam error ullam cupiditate
							quibusdam maxime sit incidunt quasi reprehenderit quisquam
							consectetur quo libero magni repellendus earum, expedita
							voluptatum{' '}
						</p>
					</div>
					<div className='flex flex-col items-center gap-8 border-4 border-[#C4C9D4] rounded-[50px] w-[348px] py-12'>
						<div className='flex flex-col gap-8.5'>
							<img
								src={ad?.user.avatarUrl}
								alt='user'
								className='w-[187px] h-[187px] object-cover rounded-[50px]'
							/>
							<Link
								className='hover:scale-105 hover:shadow-2xl transition-all duration-300'
								to={`/user/${ad?.user.id}`}
							>
								<p className='text-2xl underline font-bold text-[#222831]'>
									{ad?.user.fullName}
								</p>
							</Link>
						</div>
						<div className='flex flex-col items-start pt-6 pl-9 gap-5'>
							<div className='flex flex-row gap-4.5'>
								<img src={phone_icon} alt='phone' />
								<input
									type='tel'
									disabled
									value={
										ad?.user.phoneNumber
											? `+38${ad?.user.phoneNumber}`
											: `No phone number`
									}
									className='text-2xl font-bold text-[#222831]'
								/>
							</div>
							<div className='flex flex-row gap-4.5'>
								<img src={email_icon} alt='email' />
								<input
									type='text'
									disabled
									value={ad?.user.email ?? ``}
									className='text-2xl font-bold text-[#222831]'
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='w-full flex flex-row gap-22 items-center'>
					<div className='flex flex-col gap-8 items-start'>
						<p className='text-5xl uppercase font-bold text-[#222831]'>Map</p>
						<LoadScript
							googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}
						>
							<GoogleMap
								mapContainerStyle={containerStyle}
								center={{ lat: lat, lng: lng }}
								zoom={12}
							>
								<Marker position={{ lat: lat, lng: lng }} />
							</GoogleMap>
						</LoadScript>
					</div>
					<div className='flex flex-col items-start gap-8 pl-10 text-xl border-4 border-[#C4C9D4] rounded-[50px] w-[348px] py-12'>
						<div className='flex flex-row gap-4'>
							<img src={location_icon} alt='location' />
							<p>{street.country}</p>
						</div>
						<p>{street.state}</p>
						<p>{street.city}</p>
						<p>{street.street}</p>
					</div>
				</div>
				<RelatedAds currentAdId={ad?.id} />
			</div>
			<Footer />
		</>
	)
}
