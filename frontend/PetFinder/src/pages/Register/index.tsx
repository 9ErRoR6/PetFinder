import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import http_common from "../../http_common";
import type { IRegister } from "../../interfaces/auth";


const Register = () => {
	const navigator = useNavigate()
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting }
	  } = useForm<IRegister>();
	  const [showPassword, setShowPassword] = useState(false);
	  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

	  const onSubmit = handleSubmit(async (data: IRegister) => {
		try{
			await new Promise(resolve => setTimeout(resolve, 1000))
			await http_common.post<string>(
				'/api/User/register',
				data
			)
			toast.success("Successfully registered!");
			navigator('/login')
		} catch (error: any) {
			if (error.response && error.response.data) {
				const message = error.response.data.message || "Помилка входу";
				console.error("Login failed:", message);
				toast.error(`❌ ${message}`);
			} else {
				// Інша помилка (мережа, CORS тощо)
				console.error("Unexpected error:", error.message);
				toast.error(`⚠️ Сталася помилка: ${error.message}`);
			}
		}
	  })
	  const password = watch("password");
	return (
		<div className='w-full h-screen'>
				<div className='h-full items-center flex justify-evenly'>
					<div className='flex flex-col items-center'>
						<span className='uppercase text-4xl text-[#393E46] font-bold'>
							Account Sign Up
						</span>
					</div>
					<div className='flex flex-col w-[500px] text-[#393E46] font-bold uppercase'>
						<div className='flex flex-col items-center gap-4'>
							<form className=' w-full flex flex-col items-start ' onSubmit={onSubmit}>
								<label>Full Name</label>
								<input autoComplete="off" className=' active:bg-[#393E46] focus:-translate-y-1 focus-within:shadow-2xl w-full h-[54px] rounded bg-[#393E46] text-white pb-2 px-4 font-display text-lg transition-all duration-300' {...register("fullName", {required: true})} aria-invalid={errors.fullName ? "true" : "false"} />
								{errors.fullName?.type === "required" && (<p role="alert" className='text-red-400'>Full Name is required</p>)}
								<label>Email</label>
								<input autoComplete="off" className='focus:-translate-y-1 focus-within:shadow-2xl w-full h-[54px] rounded bg-[#393E46] text-white py-2 px-4 font-display text-lg transition-all duration-300' {...register("email", {required:"Email is required",validate: (value) => {
									if (!value.includes('@')) {
										return 'Email is required @';
									}
									return true
								}})}/>
								{errors.email && (<p role="alert" className='text-red-400'>{errors.email.message}</p>)}
								<label>Password</label>
								<div className='relative w-full focus-within:-translate-y-1 focus-within:shadow-2xl transition-all duration-300'>
									<input type={showPassword ? 'text' : 'password'} autoComplete="off" className=' w-full h-[54px] rounded bg-[#393E46] text-[#F0EEEA] py-2 px-4 font-display text-lg transition-all duration-300' {...register("password", {required: "Password is required", pattern: {value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&=+])[A-Za-z\d@$!%*?&=+]{8,}$/, message: "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character."}})}/>
									<span className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-[#F0EEEA]" onClick={togglePasswordVisibility}>
									{showPassword ? <AiOutlineEyeInvisible color='#F0EEEA' size={24} /> : <AiOutlineEye color='#F0EEEA' size={24} />}
									</span>
								</div>
								{errors.password && (<p role="alert" className='text-red-400'>{errors.password.message}</p>)}
								<label>Confirm password</label>
									<input type={showPassword ? 'text' : 'password'} autoComplete="off" className='focus-within:-translate-y-1 focus-within:shadow-2xl w-full h-[54px] rounded bg-[#393E46] text-[#F0EEEA] py-2 px-4 font-display  text-lg transition-all duration-300' {...register("confirmPassword", {
										required: "Please confirm your password",
										validate: (value) =>
											value === password || "Passwords do not match",
										})} />
								{errors.confirmPassword && (<p role="alert" className='text-red-400'>{errors.confirmPassword.message}</p>)}
								<input value={isSubmitting ? 'Loading...' : 'Sign Up'} type="submit" className='bg-[#393E46] text-white py-2 px-4 rounded font-display text-lg h-[54px] w-full cursor-pointer mt-8 hover:bg-[#222831] transition-all duration-300'/>
							</form>
							<span className='text-auxiliary-light-gray pt-4'>
								Do you have an account?{' '}
								<Link className='text-turquoise underline hover:text-[#5e574a] transition-all duration-300' to='/login'>
									Sign In
								</Link>
							</span>
						</div>
					</div>
				</div>
		</div>
	)
}

export default Register