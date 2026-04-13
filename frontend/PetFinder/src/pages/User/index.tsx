import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ad from "../../components/ad";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Pagination from "../../components/pagination";
import { usePagination } from "../../hooks/usePagination";
import type { IAd } from "../../interfaces/ad";
import type { IUser } from "../../interfaces/user";
const adsPerPage = 3;
export default function User() {
    const { id } = useParams();
    const [user, setUser] = useState<IUser>();
    const [allAds, setAllAds] = useState<IAd[]>();

    useEffect(() => {
        axios.get<IUser>(`http://localhost:5005/api/User/GetById/${id}`)
            .then(response => {
                const user = response.data;
                setUser(user)
            }),
            axios.get<IAd[]>(`http://localhost:5005/api/Ad/GetAllAsync`)
            .then(response => {
                const allAds = response.data;
                setAllAds(allAds)
            })
    }, [setUser, setAllAds])
    const userAds = allAds?.filter(ad => ad.user?.id === Number(user?.id));
    const {
        currentItems: currentAds,
        currentPage,
        totalPages,
        setCurrentPage,
      } = usePagination(userAds || [], adsPerPage);
    return(
        <>
            <Navbar />
            <div className="w-[1300px] mx-auto pt-15">
                <div className="flex flex-row gap-10 items-center">
                        <img className="size-[150px] rounded-full" src={user?.avatarUrl} alt="avatar" />
                        <p className="text-2xl font-bold font-display">{user?.fullName}</p>
                </div>
                <div className="flex flex-row justify-around mt-10 items-start">
                    <div className="flex flex-col gap-2 items-start">
                        <p className="text-2xl pl-5 font-semibold font-display">Email</p>
                        <p className="text-2xl font-display border-2 border-[#C4C9D4] rounded-[50px] w-[300px] h-[50px] items-center justify-center flex">{user?.email}</p>
                    </div>
                    <div className="flex flex-col gap-2 items-start">
                        <p className="text-2xl pl-5 font-semibold font-display">Phone number</p>
                        <p className="text-2xl font-display border-2 border-[#C4C9D4] rounded-[50px] w-[300px] h-[50px] items-center justify-center flex">{user?.phoneNumber ? `+38${user?.phoneNumber}` : 'Phone number not set'}</p>
                    </div>
                </div>
                <div className="flex flex-col mt-10 items-start pt-10">
                    <p className="text-2xl font-bold font-display">{user?.fullName}'s ads:</p>
                    <div className="flex flex-row gap-10 justify-center mx-auto py-10">
                        {currentAds?.map(ad => (
                            <Ad key={ad.id} result={ad} />
                        ))}
                    </div>
                    <div className="flex flex-row justify-center mx-auto">
                        <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}/>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
