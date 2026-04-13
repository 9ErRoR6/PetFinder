import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import UserAds from "../../components/UserAds";
import http_common from "../../http_common";
import type { IUserEdit } from "../../interfaces/user";
import { AuthReducerActionType } from "../../reducers/AuthReducer";

const UserEdit = () => {
    const navigate = useNavigate();
    const auth = useAppSelector(store => store.auth.user)
    const [avatarPreview, setAvatarPreview] = useState(auth?.AvatarUrl || "");
    const [imageError, setImageError] = useState(false);
    const dispatch = useDispatch();
    const {
		register,
		handleSubmit,
    reset,
    setValue,
		formState: { errors, isSubmitting }
	  } = useForm<IUserEdit>({
        defaultValues: {
            fullName: auth?.FullName || "",
            email: auth?.Email || "",
            phoneNumber: auth?.PhoneNumber || "",
            // інші поля
          }
      });
      useEffect(() => {
        if (auth) {
          reset({
            fullName: auth.FullName || "",
            email: auth.Email || "",
            phoneNumber: auth.PhoneNumber || "",
            password: "",
            imageUrl: auth.AvatarUrl || "",
          });
        }
        if (auth?.AvatarUrl) {
          setAvatarPreview(auth.AvatarUrl);
        }
      }, [auth, reset]);
      useEffect(() => {
        setImageError(false);
      }, [avatarPreview]);
      const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch({ type: AuthReducerActionType.LOGOUT_USER });
        navigate('/login');
      }
    const onSubmit = handleSubmit(async ({ email, password, phoneNumber, fullName, imageUrl }) => {
		await new Promise(resolve => setTimeout(resolve, 1000))
    const result = await http_common.post<string>(
			'api/User/editUser',
			{Id: auth?.Id, email, password, phoneNumber, fullName, imageUrl}
		)
    if (result.status === 200) {
        alert("Дані оновлено успішно");
        localStorage.removeItem('token');
        dispatch({ type: AuthReducerActionType.LOGOUT_USER });
        navigate('/');
    } else {
      alert("Помилка оновлення");
    }
		console.log(email, password, phoneNumber, fullName, imageUrl);
	  });

    return (
        <div><Navbar />
        <div className="w-[1300px] mx-auto pt-15">
                <h1 className="text-4xl font-bold mb-4 font-display text-left pb-10">Edit Profile:</h1>
                <div className="flex gap-40 flex-row items-center">
                    <div className="">
                        <img className=" size-[500px] rounded-xl" src={
                          imageError || !avatarPreview
                            ? "https://placehold.co/500x500?text=No+Image&font=Barlow"
                            : avatarPreview
                        }
                        alt="avatar preview"
                        onError={() => setImageError(true)} />
                    </div>
                <form className=' w-[400px] flex flex-col items-start ' onSubmit={onSubmit}>
                    <label>Full Name</label>
                    <input autoComplete="off" className='focus:outline-none focus:-translate-y-1 focus-within:shadow-2xl w-full h-[54px] rounded-[50px] border-2 border-[#C4C9D4] text-[#393E46] py-2 px-4 font-display text-lg transition-all duration-300' {...register("fullName", {required: "Full Name is required", pattern: {value: /^[a-zA-Z\s]+$/, message: "Full Name must contain only letters"}})}/>
                    {errors.fullName && (<p role="alert" className='text-red-400'>{errors.fullName.message}</p>)}
                    <label>Email</label>
                    <input autoComplete="off"  className='focus:outline-none focus:-translate-y-1 focus-within:shadow-2xl w-full h-[54px] rounded-[50px] border-2 border-[#C4C9D4] text-[#393E46] py-2 px-4 font-display text-lg transition-all duration-300'{...register("email", {required:"Email is required",validate: (value) => {
                        if (!value.includes('@')) {
                            return 'Email is required @';
                        }
                        return true
                    }})}/>
                    {errors.email && (<p role="alert" className='text-red-400'>{errors.email.message}</p>)}
                    <label>Phone Number</label>
                    <input autoComplete="off" className='focus:outline-none focus:-translate-y-1 focus-within:shadow-2xl w-full h-[54px] rounded-[50px] border-2 border-[#C4C9D4] text-[#393E46] py-2 px-4 font-display text-lg transition-all duration-300' {...register("phoneNumber", {required: "Phone Number is required", pattern: {value: /^0\d{9}$/, message: "Phone number must start with 0 and contain 10 digits"}})}/>
                    {errors.phoneNumber && (<p role="alert" className='text-red-400'>{errors.phoneNumber.message}</p>)}
                    <label>Password</label>
                    <input autoComplete="off" className='focus:outline-none focus:-translate-y-1 focus-within:shadow-2xl w-full h-[54px] rounded-[50px] border-2 border-[#C4C9D4] text-[#393E46] py-2 px-4 font-display text-lg transition-all duration-300' {...register("password", {required: "Password is required", pattern: {value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&=+])[A-Za-z\d@$!%*?&=+]{8,}$/, message: "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character."}})}/>
                    {errors.password && (<p role="alert" className='text-red-400'>{errors.password.message}</p>)}
                    <label>Image(URL)</label>
                    <input autoComplete="off" className='focus:outline-none focus:-translate-y-1 focus-within:shadow-2xl w-full h-[54px] rounded-[50px] border-2 border-[#C4C9D4] text-[#393E46] py-2 px-4 font-display text-lg transition-all duration-300' {...register("imageUrl")} onChange={(e) => {setAvatarPreview(e.target.value); setValue("imageUrl", e.target.value);}}/>
                    <div className="flex w-full flex-row-reverse gap-10 items-center">
                      <input value={isSubmitting ? 'Loading...' : 'Save'} type="submit" className='bg-[#393E46] text-white py-2 px-4 rounded-[50px] font-display text-lg uppercase font-bold h-[54px] w-full cursor-pointer mt-8 hover:bg-[#222831] transition-all duration-300'/>
                      <button className="bg-[#393E46] text-white py-2 px-4 rounded-[50px] font-display text-lg uppercase font-bold h-[54px] w-full cursor-pointer mt-8 hover:bg-[#222831] transition-all duration-300" onClick={handleLogout}>
                          Logout
                      </button>
                    </div>
                </form>
            </div>
            <div className="flex flex-col pt-10">
              <h1 className="text-4xl font-bold mb-4 font-display text-left">My Ads:</h1>
              <UserAds />
            </div>
        </div>
        <Footer /></div>
    )
}

export default UserEdit;
