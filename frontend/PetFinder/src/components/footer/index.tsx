import { Link } from "react-router-dom";
import logo from "../../assets/logo_pet_finder_2.svg";
export default function Footer() {
    return (
        <footer className=' mx-2 bg-[#222831] font-display text-lg font-[700] text-[20px] text-[#DFD0B8] rounded-[50px] mb-2 mt-16'>
			<div className='w-full m-auto flex justify-between items-center p-[60px]'>
				<Link className='no-underline' to='/'>
					<img className='h-[50px]' src={logo} alt="logo" />
				</Link>
				<p className="text-sm">&copy; {new Date().getFullYear()} Lost & Found. All rights reserved.</p>
			</div>
		</footer>
    )
}
