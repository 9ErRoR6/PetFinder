import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import logo from '../../assets/logo_pet_finder_2.svg'
import type { IUserLoginInfo } from '../../interfaces/auth'
const Navbar = () => {
    const [user, setUser] = useState<IUserLoginInfo | null>(null);

    useEffect(() => {
        if (localStorage.token) {
            const user = jwtDecode<IUserLoginInfo>(localStorage.token);
            setUser(user);
        }
    }, []);

    const auth = useAppSelector(store => store.auth)


    return (
        <nav className=' mx-2 bg-[#222831] font-display text-lg font-[700] text-[20px] text-[#DFD0B8] rounded-[50px] mt-2'>
			<div className='w-full m-auto flex justify-between items-center p-[30px]'>
				<Link className='no-underline' to='/'>
					<img className='h-[50px]' src={logo} alt="logo" />
				</Link>
				<div className='flex items-center gap-6'>
					{!auth.isAuth ? (
						<Link className='font-display transition-transform duration-400 hover:scale-110 ' to='login'>
							<span className='text-[#3b3731] py-2 px-4 rounded-4xl bg-[#DFD0B8]'>
								Sign In
							</span>
						</Link>
					) : (
						<div className='relative flex flex-row-reverse gap-10 items-center'>
							<div
								className='rounded-full overflow-hidden size-[50px] hover:scale-110 transition-transform duration-400'
							>
								{user && (
								<Link className='' to={`/user/${user.Id}/edit`}>
									<img
										className='object-cover w-full h-full'
										src={user.AvatarUrl}
										alt='User Profile'
									/>
								</Link>
								)}
							</div>
							<div className=' text-lg flex gap-6 '>
								<Link
									className="no-underline uppercase relative tracking-[1px] content-[''] after:h-[1px] after:w-[0%] after:left-0 after:-bottom-[5px] after:duration-300 after:absolute after:bg-[#DFD0B8] hover:after:w-full hover:after:left-0"
									to='/addAd'
								>
									New Ad
								</Link>
								{user?.role === 'Admin' && (
								<Link
									className="no-underline uppercase relative tracking-[1px] content-[''] after:h-[1px] after:w-[0%] after:left-0 after:-bottom-[5px] after:duration-300 after:absolute after:bg-[#DFD0B8] hover:after:w-full hover:after:left-0"
									to='/admin/users'
								>
									Admin Panel
								</Link>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</nav>
    )
}

export default Navbar