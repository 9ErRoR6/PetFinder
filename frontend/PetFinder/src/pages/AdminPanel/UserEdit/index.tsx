import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import http_common from "../../../http_common";
import type { IUser, IUserEdit } from "../../../interfaces/user";

export const UserEditAdminPanel = () => {
    const { id } = useParams();
    const [user, setUser] = useState<IUser>();
    const navigate = useNavigate();
    useEffect(() => {
        http_common.get<IUser>(`api/User/GetById/${id}`).then(response => {
            setUser(response.data);
        });
    }, [id]);
    const {
		register,
		handleSubmit,
    reset,
    setValue,
		formState: { errors, isSubmitting }
	  } = useForm<IUserEdit>({
        defaultValues: {
            fullName: user?.fullName,
            email: user?.email,
            phoneNumber: user?.phoneNumber,
          }
      });
      useEffect(() => {
        if (user) {
          reset({
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber
          });
        }
      }, [user, reset]);
    const onSubmit = handleSubmit(async ({ email, phoneNumber, fullName }) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const result = await http_common.post(
        'api/User/editUserProfile',
        {Id: user?.id, email, phoneNumber, fullName}
      )
      if (result.status === 200) {
          toast.success("User updated successfully");
          navigate('/admin/users');
      } else {
        toast.error("User update failed");
      }
		console.log(email, phoneNumber, fullName);
	  });
    const handleDelete = () => {
      http_common.delete(`api/User/deleteUser?email=${user?.email}`).then(response => {
        console.log(response);
        if (response.status === 200) {
          toast.success("User deleted successfully");
          navigate('/admin/users');
        } else {
          toast.error("User deletion failed");
        }
      });
    }
    const handleBlock = () => {
      http_common.delete(`api/User/blockUser?email=${user?.email}`).then(response => {
        console.log(response);
        if (response.status === 200) {
          toast.success("User blocked successfully");
          navigate('/admin/users');
        } else {
          toast.error("User blocking failed");
        }
      });
    }
    return (
        <div className="flex flex-row justify-between gap-10">
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


                    <div className="flex w-full flex-row-reverse gap-10 items-center">
                      <input value={isSubmitting ? 'Loading...' : 'Save'} type="submit" className='bg-[#393E46] text-white py-2 px-4 rounded-[50px] font-display text-lg uppercase font-bold h-[54px] w-full cursor-pointer mt-8 hover:bg-[#222831] transition-all duration-300'/>
                    </div>
                </form>
                <div className="flex flex-row items-end gap-4 w-[400px]">
                  <button onClick={handleDelete} className="bg-[#393E46] text-white py-2 px-4 rounded-[50px] font-display text-lg uppercase font-bold h-[54px] w-full cursor-pointer mt-8 hover:bg-[#222831] transition-all duration-300">Delete</button>
                  <button onClick={handleBlock} className="bg-[#393E46] text-white py-2 px-4 rounded-[50px] font-display text-lg uppercase font-bold h-[54px] w-full cursor-pointer mt-8 hover:bg-[#222831] transition-all duration-300">Block</button>
                </div>
        </div>
    )
}