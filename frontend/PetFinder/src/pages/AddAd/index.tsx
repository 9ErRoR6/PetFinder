import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import Footer from "../../components/footer";
import ImageUpload from "../../components/ImageUpload";
import LocationPicker from "../../components/LocationPicker";
import Navbar from "../../components/navbar";
import http_common from "../../http_common";
import type { IaddAd } from "../../interfaces/ad";
import type { IAnimalType } from "../../interfaces/animalType";
export default function AddAd() {
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [animalTypes, setAnimalTypes] = useState<IAnimalType[]>([])
    const [lat, setLat] = useState<number | null>(null);
    const [lng, setLng] = useState<number | null>(null);
    const auth = useAppSelector(store => store.auth.user)
    useEffect(() => {
        axios.get<IAnimalType[]>('http://localhost:5005/api/AnimalType/GetAllAsync')
            .then(response => {
                const allAnimalTypes = response.data;
                setAnimalTypes(allAnimalTypes)
            })
    }, [setAnimalTypes])
    const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	  } = useForm<IaddAd>();
    const onSubmit = handleSubmit(async ({ title, description, animalType, color }) => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        const formData = new FormData();
        formData.append("userId", auth?.Id || "");
        formData.append("title", title);
        formData.append("description", description);
        formData.append("animalTypeId", animalType);
        formData.append("color", color);
        formData.append("isLost", "true");
        formData.append("latitude", String(lat));
        formData.append("longitude", String(lng));
        formData.append("date", new Date().toISOString());
        if (selectedFile) {
            formData.append("imageUrl", selectedFile);
        }
        const result = await http_common.post<string>(
			'api/Ad/Add',
			formData
		)
        if (result.status === 200) {
            alert("Обявлення успішно додано");
            navigate('/')
        } else {
        alert("Помилка додавання обявлення");
        }

        console.log(formData.getAll);
    });
    const handleFileSelect = (file: File | null) => {
        setSelectedFile(file);
    };
    return (
        <>
            <Navbar />
            <div className="w-[1300px] mx-auto pt-15 flex flex-col gap-10">
                <h1 className="text-4xl font-bold font-display text-center pb-10">New Ad</h1>
                <div className="flex flex-row gap-22 items-center">
                    <div>
                        <ImageUpload onFileSelect={handleFileSelect} />
                    </div>
                    <div className="w-fullflex flex-col items-start">
                        <form className=' w-[400px] flex flex-col items-start ' onSubmit={onSubmit}>
                            <label className="text-lg  font-display font-bold">Title</label>
                            <input autoComplete="off" className='focus:outline-none focus:-translate-y-1 focus-within:shadow-2xl w-[600px] h-[54px] rounded-[50px] border-2 border-[#C4C9D4] text-[#393E46] py-2 px-4 font-display font-semibold text-lg transition-all duration-300' {...register("title", {required: "Title is required"})}/>
                            {errors.title && (<p role="alert" className='text-red-400'>{errors.title.message}</p>)}
                            <label className="text-lg  font-display font-semibold">Description</label>
                            <textarea autoComplete="off"  className='focus:outline-none focus:-translate-y-1 focus-within:shadow-2xl w-[600px] h-[140px] rounded-[50px] border-2 border-[#C4C9D4] text-[#393E46] py-2 px-4 font-display font-semibold text-lg transition-all duration-300'{...register("description", {required:"Description is required"})}/>
                            {errors.description && (<p role="alert" className='text-red-400'>{errors.description.message}</p>)}
                            <div className="flex flex-row gap-10">
                                <div className="flex flex-col items-start">
                                    <label className="text-lg  font-display font-semibold">Color</label>
                                    <input autoComplete="off" className='focus:outline-none focus:-translate-y-1 focus-within:shadow-2xl w-[304px] h-[54px] rounded-[50px] border-2 border-[#C4C9D4] text-[#393E46] py-2 px-4 font-display text-lg font-semibold transition-all duration-300' {...register("color", {required: "Color is required"})}/>
                                    {errors.color && (<p role="alert" className='text-red-400'>{errors.color.message}</p>)}
                                </div>
                                <div className="flex flex-col items-start">
                                    <label className="text-lg  font-display font-semibold">Animal Type</label>
                                    <select autoComplete="off" className='focus:outline-none focus:-translate-y-1 focus-within:shadow-2xl w-[250px] h-[54px] rounded-[50px] border-2 border-[#C4C9D4] text-[#393E46] py-2 px-4 font-display text-lg font-semibold transition-all duration-300' {...register("animalType", {required: "Animal Type is required"})}>
                                    {animalTypes.map((animalType) => (
                                        <option className="text-display-2 font-semibold  text-[#222831]" key={animalType.id} value={animalType.id}>{animalType.name}</option>))}
                                    </select>
                                    {errors.animalType && (<p role="alert" className='text-red-400'>{errors.animalType.message}</p>)}
                                </div>

                            </div>
                            <div className="flex w-full flex-row-reverse gap-10 items-center">
                                <input value={isSubmitting ? 'Loading...' : 'Save'} type="submit" className='bg-[#393E46] text-white py-2 px-4 rounded-[50px] font-display text-lg uppercase font-bold h-[54px] w-full cursor-pointer mt-8 hover:bg-[#222831] transition-all duration-300'/>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex flex-col gap-10 items-center justify-center">
                    <h1 className="text-4xl font-bold font-display text-center">Add location</h1>
                    <div>
                        <LocationPicker setLat={setLat} setLng={setLng} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}