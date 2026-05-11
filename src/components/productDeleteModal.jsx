import { useState } from "react";
import { MdDeleteOutline  } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

export default function ProductDeleteModal(props){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const product = props.product;
    const refresh = props.refresh;

    function handleDelete(){
        const token = localStorage.getItem("token");
        axios.delete(import.meta.env.VITE_API_URL + "/products/" + product.productId,
            {
                headers : {
                    Authorization : "Bearer " + token
                }
            }
        ).then(
            ()=>{ 
                toast.success("Product delete successfully");
                refresh();    
            }
        ).catch(
            (error)=>{ toast.error(error.response); }
        )
    }
            
    return(
        <>
            <button 
                onClick={ ()=>{setIsModalOpen(true)} }
                className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-xl font-semibold shadow hover:bg-specialColor hover:text-accent transition-all duration-200"
            >
                <MdDeleteOutline />
            </button>
            
            {
                isModalOpen &&
                <div className="w-screen h-screen bg-black/40 fixed top-0 left-0 flex justify-center items-center">
                    <div className="w-[550px] h-[250px] bg-white flex flex-col justify-center items-center px-12 text-wrap rounded-xl">
                        <h1 className="text-xl  font-bold mb-4">Are you sure you want to delete product with id {product.productId} ?</h1>
                        <div className="flex gap-4">
                            <button 
                                onClick={()=>{
                                    handleDelete();
                                    setIsModalOpen(false);
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                            >
                            Delete
                            </button>
                            <button
                                onClick={()=>{
                                    setIsModalOpen(false);
                                }}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                            >
                            Cancel
                            </button>
                        </div>
                    </div>
                </div>
            }
            
        </>
    );
}