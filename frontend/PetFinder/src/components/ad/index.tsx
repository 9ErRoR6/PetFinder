import { motion } from "motion/react";
import { Link } from "react-router-dom";
import find_img from '../../assets/find_img.svg';
import type { IAd } from "../../interfaces/ad";
export default function Ad({ result }: { result: IAd }) {
	return (
        <Link className="" to={`/ad/${result.id}`}>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onHoverStart={() => console.log('hover started!')}>
            <div className={`${!result.isLost ? 'bg-[#508E4A] relative  opacity-50 z-10 rounded-lg' : ''}`}>
                {!result.isLost ? <img src={find_img} alt="lost" className="size-[160px] object-cover absolute bottom-[130px] right-[70px] rounded-lg" /> : ''}
                <div className="w-[300px] h-[350px] flex flex-col border-2 gap-1 border-[#C4C9D4] rounded-lg text-display">
                    <div className="w-full h-2/3">
                        <img src={result.imageUrl} alt="ad" className="w-full h-full object-cover rounded-lg" />
                    </div>
                    <div className="w-full h-[100px] flex flex-col items-start pl-2 text-display text-[#222831]">
                        <h1 className="text-2xl font-bold">{result.title}</h1>
                        <p className="text-sm ">{result.description}</p>
                        <p className="text-sm ">{result.user.fullName}</p>
                        <p className="text-sm ">{result.user.phoneNumber ? `+38${result.user.phoneNumber}` : `${result.user.email}`}</p>
                    </div>
                </div>
            </div>
             </motion.div>
        </Link>

	)
}
