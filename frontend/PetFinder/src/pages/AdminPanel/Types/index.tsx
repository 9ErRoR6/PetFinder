import { useEffect, useMemo, useState } from "react";

import { CategoryModal } from "@/components/TypeModalAdd";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import http_common from "../../../http_common";

type AnimalType = {
  id: number;
  name: string;
}
export const Types = () => {
    const [types, setTypes] = useState<AnimalType[]>([]);
    const [pageSize, setPageSize] = useState(10);
    const [filter, setFilter] = useState('');
    const fetchTypes = async () => {
        const result = await http_common.get<AnimalType[]>("api/AnimalType/GetAllAsync");
        setTypes(result.data);
    }
    useEffect(() => {
        fetchTypes();
    }, []);
    console.log(types)
    const columns = useMemo<ColumnDef<AnimalType>[]>(() => [
      {
          header: 'ID',
          accessorKey: 'id',
      },
      {
          header: 'Name',
          accessorKey: 'name',
      },
      {
          header: 'Actions',
          cell: ({ row }) => (
            <button className="border-2 border-black font-bold font-display rounded-md px-10 py-2 hover:bg-black hover:text-white transition-all duration-300" onClick={() => handleDelete(row.original.id)}>Delete</button>
          )

      }], [types])
      const table = useReactTable({
        data: types,
        columns,
        state: {
            globalFilter: filter,
        },
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setFilter,
        getCoreRowModel: getCoreRowModel(),
      })
      const handleDelete = async (id: number) => {
        const result = await http_common.delete(`api/AnimalType/DeleteAsync?id=${id}`);
        if (result.status === 200) {
          toast.success(result.data);
          fetchTypes();
        } else {
          toast.error(result.data);
        }
      }
      const handleAdd = async () => {
        const result = await http_common.post("api/AnimalType/CreateAsync", { name: "New Type" });
        if (result.status === 200) {
          toast.success(result.data);
          fetchTypes();
      }}
    return (
      <div>
        <div className="flex  justify-between items-center px-4 pb-6">
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
            <CategoryModal fetchTypes={fetchTypes} />
            </div>
        </div>
        <table className="w-full mx-auto border-2 border-black">
            <thead className="bg-black text-white">
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th className="w-1/3" key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody className="">
                {table.getRowModel().rows.map((row) => (
                    <tr className="h-12 w-1/3" key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td className="w-1/3" key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
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