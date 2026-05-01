import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";

export default function AdminProductsPage(){
    return (
        <div className="w-full h-full ">
            <Link to="/admin/add-product" className="fixed bottom-10 right-10 w-[60px] h-[60px] bg-accent flex justify-center items-center text-white text-3xl rounded-full shadow-2xl hover:bg-specialColor hover:text-4xl">
                <MdAdd />
            </Link>
        </div>
    );
}