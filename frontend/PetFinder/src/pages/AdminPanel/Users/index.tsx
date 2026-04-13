import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import http_common from "../../../http_common";
type User = {
    id: number;
    fullName: string;
    email: string;
    createdAt: string;
    phoneNumber: string;
    role: string;
    lockoutEnabled: boolean;
}


export const Users = () => {
    const [filter, setFilter] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            const result = await http_common.get<User[]>("http://localhost:5005/api/User/getAll");
            setUsers(result.data.payload);
        } catch (error) {
            console.error("Помилка при завантаженні користувачів:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [])
    console.log(users)
    const columns = useMemo<ColumnDef<User>[]>(() => [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Full Name',
            accessorKey: 'fullName',
        },
        {
            header: 'Email',
            accessorKey: 'email',
        },
        {
            header: 'Created At',
            accessorKey: 'createdAt',
        },
        {
            header: 'Phone Number',
            accessorKey: 'phoneNumber',
        },
        {
            header: 'Role',
            accessorKey: 'role',
        },
        {
            header: 'Blocked',
            accessorKey: 'lockoutEnabled',
        },
        {
            header: 'Actions',
            cell: ({ row }) => (<div className="flex gap-2 justify-center">
            <button className="border-2 border-black font-bold font-display rounded-md px-2 py-2 hover:bg-black hover:text-white transition-all duration-300" onClick={() => handleBlock(row.original.email)}>Block</button>
            <button className="border-2 border-black font-bold font-display rounded-md px-2 py-2 hover:bg-black hover:text-white transition-all duration-300" onClick={() => handleDelete(row.original.email)}>Delete</button>
            </div>)

        }
    ], [users])
    const table = useReactTable({
        data: users,
        columns,
        state: {
            globalFilter: filter,
        },
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setFilter,
        getCoreRowModel: getCoreRowModel(),
    })
    const handleBlock = async (email: string) => {
        try {
            console.log(email)
            const result = await http_common.post<string>(`api/User/blockUser?email=${email}`)
            if (result.status === 200) {
                toast.success(result.data);
                fetchData();
            } else {
                toast.error(result.data);
            }
        } catch (error: any) {
            toast.error(error.response.data);
        }

    }

    const handleDelete = async (email: string) => {
        try {
            const result = await http_common.delete(`api/User/deleteUser?email=${email}`)
            if (result.status === 200) {
                toast.success(result.data);
                fetchData();
            } else {
                toast.error(result.data);
            }
        } catch (error: any) {
            toast.error(error.response.data);
        }
    }
  return (
    <div>
        <div className="flex justify-between items-center px-4 pb-6">
            <h1 className="text-2xl font-bold">Users</h1>
            <div className="flex items-center gap-2">
                <input className="border-2 border-black font-bold font-display rounded-md p-2" type="text" placeholder="Search by name" value={filter} onChange={(e) => setFilter(e.target.value)} />
                <select className="border-2 border-black font-bold font-display rounded-md p-2 h-11" value={pageSize} onChange={e => {
                const newSize = Number(e.target.value);
                setPageSize(newSize);
                table.setPageSize(newSize);}}>
                    {[3, 5, 10].map(size => (
                <option key={size} value={size}>{size} per page</option>
            ))}</select>
            </div>
        </div>
        <table className="w-full mx-auto border-2 border-black">
            <thead className="bg-black text-white">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody className="">
                {table.getRowModel().rows.map((row) => (
                    <tr className="h-12" key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="flex justify-center items-center px-4 py-6 gap-2">
        <button className="border-2 border-black font-bold font-display rounded-md px-2 py-2 hover:bg-black hover:text-white transition-all duration-300" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <SlArrowLeft/>
        </button>{' '}
        <span className="text-lg font-display">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>{' '}
        <button className="border-2 border-black font-bold font-display rounded-md px-2 py-2 hover:bg-black hover:text-white transition-all duration-300" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <SlArrowRight />
        </button>{' '}
      </div>
    </div>
  )
}
