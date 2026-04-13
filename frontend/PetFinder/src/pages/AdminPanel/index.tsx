import { Outlet } from "react-router-dom";
import AdminSideBar from "../../components/AdminSideBar";
import Navbar from "../../components/navbar";
export default function AdminPanel() {
  return (
    <div className="">
      <Navbar />
      <div className="w-[1800px] mx-auto pt-10">
        <p className="text-4xl font-bold font-display pb-10">Admin Panel</p>
        <div className="flex gap-10">
          <AdminSideBar />
          <main className="w-full bg-stone-100 rounded-lg p-5">
              <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}