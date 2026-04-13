import { Link } from "react-router-dom";

export default function AdminSideBar() {
    return (
        <aside className="w-[350px] bg-stone-100 rounded-lg">
            <nav>
                <div className="flex flex-col text-lg items-center gap-4 font-bold font-display py-5">
                    <Link className="p-2 w-2/3 border-2 rounded-lg hover:bg-stone-200 transition-all duration-300" to="/admin/users">Users</Link>
                    <Link className="p-2 w-2/3 border-2 rounded-lg hover:bg-stone-200 transition-all duration-300" to="/admin/types">Types</Link>
                    <Link className="p-2 w-2/3 border-2 rounded-lg hover:bg-stone-200 transition-all duration-300" to="/admin/ads">Ads</Link>
                </div>
            </nav>
        </aside>
    )
}