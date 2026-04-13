import axios from 'axios'
import { useEffect, useState } from 'react'
import type { AdFilters } from '../../interfaces/ad'
import type { IAnimalType } from '../../interfaces/animalType'
type Props = {
	filters: AdFilters
	setFilters: React.Dispatch<React.SetStateAction<AdFilters>>
}
const Sidebar: React.FC<Props> = ({ filters, setFilters }) => {
	const [animalTypes, setAnimalTypes] = useState<IAnimalType[]>([])
	useEffect(() => {
		axios
			.get<IAnimalType[]>('http://localhost:5005/api/AnimalType/GetAllAsync')
			.then(response => {
				const allAnimalTypes = response.data
				setAnimalTypes(allAnimalTypes)
			})
	}, [setAnimalTypes])
	const resetFilters = () => {
		setFilters({})
	}
	return (
		<div className='w-[300px] border-2 rounded-[50px] border-[#222831] text-display font-bold pb-4'>
			<div className='text-2xl font-bold pt-4'>Filter</div>
			<div className='flex flex-col gap-2 px-6'>
				<label className='w-full border-b-1 border-[#222831] pb-2'>
					<input
						type='text'
						placeholder='Find by name...'
						value={filters.search || ''}
						onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
						className='w-full border-2 font-display font-bold border-[#222831] rounded-[50px] p-3 hover:shadow-xl focus:-translate-y-1 placeholder:text-[#222831] focus:shadow-2xl transition-all duration-300'
					/>
				</label>
				<label className='w-full mb-2'>
					<input
						type='text'
						placeholder='Find by color...'
						value={filters.color || ''}
						onChange={e => setFilters(f => ({ ...f, color: e.target.value }))}
						className='w-full border-2 font-display font-bold border-[#222831] rounded-[50px] p-3 hover:shadow-xl focus:-translate-y-1 placeholder:text-display-2 placeholder:text-[#222831]  focus:shadow-2xl transition-all duration-300'
					/>
				</label>
				<label className='w-full border-b-1 border-[#222831] pb-2'>
					Type:
					<select
						value={filters.animalType || ''}
						onChange={e =>
							setFilters(f => ({ ...f, animalType: e.target.value }))
						}
						className='w-full border-2 font-display font-bold border-[#222831] rounded-[50px] p-3 hover:shadow-xl focus:-translate-y-1  focus:shadow-2xl  focus:border-3 transition-all duration-300 focus:rounded-[50px] bg-[#F0EEEA]'
					>
						<option className='text-display' value=''>
							All
						</option>
						{animalTypes.map(animalType => (
							<option
								className='text-display-2 font-bold  text-[#222831]'
								key={animalType.id}
								value={animalType.name}
							>
								{animalType.name}
							</option>
						))}
					</select>
				</label>

				<div className='flex flex-col border-b-1 border-[#222831] pb-2'>
					<label className=' flex flex-row items-center mb-2'>
						<input
							type='checkbox'
							checked={filters.isLost || false}
							onChange={e =>
								setFilters(f => ({ ...f, isLost: e.target.checked }))
							}
							className='sr-only peer'
						/>
						<div className='w-5 h-5 rounded-md border border-[#222831] bg-[#F0EEEA] peer-checked:bg-[#222831] flex items-center justify-center transition-colors'>
							<svg
								width='15'
								height='15'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M23.0774 0.332181C22.6269 0.0344837 22.0789 -0.0687073 21.5537 0.0453017C21.0286 0.159311 20.5694 0.481184 20.2772 0.940133L8.93193 18.7599L3.399 13.5469C3.2038 13.363 2.97495 13.22 2.72552 13.1262C2.4761 13.0324 2.21099 12.9896 1.94533 13.0002C1.4088 13.0216 0.902585 13.2593 0.538056 13.6611C0.173528 14.0628 -0.0194585 14.5956 0.00155222 15.1423C0.0225629 15.6891 0.255849 16.2049 0.650092 16.5763L7.91484 23.4206C7.91484 23.4206 8.12338 23.6036 8.21989 23.6675C8.44297 23.815 8.69238 23.9163 8.95387 23.9656C9.21536 24.0149 9.48382 24.0112 9.74392 23.9547C10.004 23.8983 10.2506 23.7902 10.4697 23.6366C10.6888 23.483 10.8761 23.2869 11.0208 23.0596L23.674 3.18557C23.9662 2.72655 24.0674 2.16808 23.9555 1.63298C23.8437 1.09789 23.5278 0.629988 23.0774 0.332181Z'
									fill='#F0EEEA'
								/>
							</svg>
						</div>
						<span className='ml-2'>Lost</span>
					</label>
					<label className=' flex flex-row items-center mb-2'>
						<input
							type='checkbox'
							checked={filters.isLost === undefined}
							onChange={() => setFilters(f => ({ ...f, isLost: undefined }))}
							className='sr-only peer'
						/>
						<div className='w-5 h-5 rounded-md border border-[#222831] bg-[#F0EEEA] peer-checked:bg-[#222831] flex items-center justify-center transition-colors'>
							<svg
								width='15'
								height='15'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M23.0774 0.332181C22.6269 0.0344837 22.0789 -0.0687073 21.5537 0.0453017C21.0286 0.159311 20.5694 0.481184 20.2772 0.940133L8.93193 18.7599L3.399 13.5469C3.2038 13.363 2.97495 13.22 2.72552 13.1262C2.4761 13.0324 2.21099 12.9896 1.94533 13.0002C1.4088 13.0216 0.902585 13.2593 0.538056 13.6611C0.173528 14.0628 -0.0194585 14.5956 0.00155222 15.1423C0.0225629 15.6891 0.255849 16.2049 0.650092 16.5763L7.91484 23.4206C7.91484 23.4206 8.12338 23.6036 8.21989 23.6675C8.44297 23.815 8.69238 23.9163 8.95387 23.9656C9.21536 24.0149 9.48382 24.0112 9.74392 23.9547C10.004 23.8983 10.2506 23.7902 10.4697 23.6366C10.6888 23.483 10.8761 23.2869 11.0208 23.0596L23.674 3.18557C23.9662 2.72655 24.0674 2.16808 23.9555 1.63298C23.8437 1.09789 23.5278 0.629988 23.0774 0.332181Z'
									fill='#F0EEEA'
								/>
							</svg>
						</div>
						<span className='ml-2'>All</span>
					</label>
				</div>
				<label className='w-full flex flex-row items-center mb-2'>
					<input
						type='checkbox'
						checked={filters.recentOnly || false}
						onChange={e =>
							setFilters(f => ({ ...f, recentOnly: e.target.checked }))
						}
						className='sr-only peer'
					/>
					<div className='w-5 h-5 rounded-md border border-[#222831] bg-[#F0EEEA] peer-checked:bg-[#222831] flex items-center justify-center transition-colors'>
						<svg
							width='15'
							height='15'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M23.0774 0.332181C22.6269 0.0344837 22.0789 -0.0687073 21.5537 0.0453017C21.0286 0.159311 20.5694 0.481184 20.2772 0.940133L8.93193 18.7599L3.399 13.5469C3.2038 13.363 2.97495 13.22 2.72552 13.1262C2.4761 13.0324 2.21099 12.9896 1.94533 13.0002C1.4088 13.0216 0.902585 13.2593 0.538056 13.6611C0.173528 14.0628 -0.0194585 14.5956 0.00155222 15.1423C0.0225629 15.6891 0.255849 16.2049 0.650092 16.5763L7.91484 23.4206C7.91484 23.4206 8.12338 23.6036 8.21989 23.6675C8.44297 23.815 8.69238 23.9163 8.95387 23.9656C9.21536 24.0149 9.48382 24.0112 9.74392 23.9547C10.004 23.8983 10.2506 23.7902 10.4697 23.6366C10.6888 23.483 10.8761 23.2869 11.0208 23.0596L23.674 3.18557C23.9662 2.72655 24.0674 2.16808 23.9555 1.63298C23.8437 1.09789 23.5278 0.629988 23.0774 0.332181Z'
								fill='#F0EEEA'
							/>
						</svg>
					</div>
					<span className='ml-2'>Last 7 days</span>
				</label>

				<button
					className='bg-[#222831] text-[#d3cec4] font-bold font-display text-2xl py-3 w-full mx-auto rounded-[50px] hover:scale-105 hover:text-[#d3cec4] transition-all duration-300 cursor-pointer'
					onClick={resetFilters}
				>
					Reset
				</button>
			</div>
		</div>
	)
}
export default Sidebar
