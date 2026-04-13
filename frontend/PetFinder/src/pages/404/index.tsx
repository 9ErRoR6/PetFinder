import { Link } from 'react-router-dom'
import notFound from '../../assets/notFound.svg'
export default function NotFound() {
  return (
      <div className='flex flex-col gap-8 items-center justify-center h-screen'>
        <img src={notFound} alt="not found" className='w-1/2 h-1/2' />
        <h1 className='text-4xl font-bold'>Oops! Page not found</h1>
        <Link to="/" className='bg-[#222831] py-2 px-16 rounded-[50px] text-2xl font-bold text-[#DFD0B8]'>Go to Home</Link>
      </div>
  )
}
