import { useState } from "react";
import { MdDeleteOutline  } from "react-icons/md";
import { FaEye, FaPhoneAlt, FaHome   } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import priceFormat from "../utils/priceFormat";

export default function OrderDetailsModal(props){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const order = props.order;
            
    return(
        <>
            <button 
                onClick={ ()=>{setIsModalOpen(true)} }
                className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-xl font-semibold shadow hover:bg-specialColor hover:text-accent transition-all duration-200"
            >
                <FaEye />
            </button>
            
            {
               isModalOpen &&
                <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 px-4">
                    
                    <div className="w-3xl bg-white rounded-md shadow-lg relative p-4">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 rounded right-3 bg-gray-500 px-3 py-1 hover:bg-red-800 text-lg hover:text-white"
                        >
                            ✕
                        </button>
                        <div className="flex flex-row items-center  text-sm -3 mb-2">
                            <p className="mr-8 p-1 rounded bg-gray-200">{order.orderId}</p>
                            <p className="text-gray-600 mr-8">{order.email}</p>
                            <FaPhoneAlt /><p className="text-gray-600 mr-8 ml-2">{order.phone}</p>
                        </div> 
                        <div className="flex flex-row  items-center pb-3">
                            <FaHome /><p className="ml-1 text-sm text-gray-700"><span className="font-semibold text-accent">Kasun Malshan</span>, no 11 , Galle , Southern , 80000</p>
                        </div>

                        {/* Product List */}
                        <div className="h-[400px] overflow-y-scroll pb-10 space-y-3">

                        {
                            order.items.map(
                                (item, index)=>{
                                    return(
                                        <div className="flex justify-between items-center bg-gray-200 rounded-md p-4" key={index}>
                                            <div className="flex gap-4">
                                                <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded"/>
                                                <div>
                                                    <p className="font-semibold text-sm">{item.product.name}</p>
                                                    <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                                                    <p className="text-sm text-gray-500">Price: {priceFormat(item.product.price)}</p>
                                                </div>
                                            </div>
                                            <p className="font-semibold text-gray-700">{ priceFormat(item.product.price * item.quantity)}</p>
                                        </div>
                                    );
                                }
                            )
                        }
                        </div>

                        {/* Bottom Total */}
                        <div className="bg-gray-400 rounded-md p-4 flex justify-end items-center">
                            <p className="text-lg font-bold">{priceFormat(order.total)}</p>
                        </div>

                    </div>

</div>
            }
            
        </>
    );
}