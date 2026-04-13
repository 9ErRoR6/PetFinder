
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import http_common from "@/http_common";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
interface Props {
    fetchTypes: () => void; // функція для оновлення списку категорій
  }
export function CategoryModal({ fetchTypes }: Props) {
    const [name, setName] = useState("")
    const [open, setOpen] = useState(false)
    const handleSubmit = async () => {
        console.log("Категорія:", name)
        if (!name.trim()) {
            toast.error("Name cannot be empty")
            return
          }

          try {
            const result = await http_common.post("api/AnimalType/add", { name })
            if (result.status === 200) {
              toast.success(result.data)
              fetchTypes() // оновлення списку типів
              setName("")
              setOpen(false)
            }
          } catch (error: any) {
            toast.error(error?.response?.data || "Error")
          }

    }

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-transparent text-black border-2 border-black p-2 rounded-md h-11 w-40 font-bold font-display hover:bg-black hover:text-white transition-all duration-300 hover:cursor-pointer">Add Type</Button>
        </DialogTrigger>
        <DialogContent className="bg-[#F0EEEA] font-display">
          <DialogHeader>
            <DialogTitle>New Type</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Type Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={handleSubmit}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }