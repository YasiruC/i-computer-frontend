import { useEffect, useState } from "react";
import { MdDeleteOutline  } from "react-icons/md";
import { FaEye, FaPhoneAlt, FaHome   } from "react-icons/fa";
import axios from "axios";
import api from "../utils/api.js"
import toast from "react-hot-toast";
import priceFormat from "../utils/priceFormat";

export default function OrderDetailsModal(props){
    const order = props.order;
    const refresh = props.refresh;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notes, setNotes] = useState(order.notes);
    const [status, setStatus] = useState(order.orderState);
    const [isUpdating, setIsUpdating] = useState(false);
    const [user, setUser] = useState(null);
    useEffect(()=>{
        const token = localStorage.getItem("token");
        api.get("/users/profile",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => { 
            setUser(response.data);
        }).catch((error)=>{
            console.error("Error fetching user profile:", error);
        });
    },[]);

    async function updateOrder(){
        setIsUpdating(true);
        const token = localStorage.getItem("token");
        try{
            await api.put("/orders/" + order.orderId , {
                notes : notes,
                status : status
            },{
                headers : {
                    Authorization : "Bearer " + token
                }
            });
            toast.success("Order update successfully");
            setIsUpdating(false);
            refresh()
        }catch(error){
            setIsUpdating(false);
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }
            
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
                        <div className="flex flex-row  items-center mb-2">
                            <FaHome /><p className="ml-1 text-sm text-gray-700"><span className="font-semibold text-accent">{order.firstName+" "+order.lastName}</span>, {order.addressLineOne+" "+order.addressLineTwo}</p>
                        </div>
                        <div className="flex flex-row  items-center mb-2">
                            <p className="mr-8 text-sm text-gray-700">Order Date: {new Date(order.date).toLocaleDateString()}</p>
                            <p className="text-sm font-semibold text-specialColor p-1 rounded bg-specialColor/20">{order.orderState}</p>
                        </div>
                        <div className="flex flex-row  items-center w-full mb-3">
                            <p className="mr-8 text-sm text-gray-700"><span className="font-bold text-accent">Notes: </span>{order.notes || "No notes available"}</p>
                        </div>

                        {/* Product List */}
                        <div className="h-[200px] overflow-y-scroll pb-3 space-y-3">

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
                        <div className="bg-gray-300 rounded-md mb-3 p-4 flex justify-end items-center">
                            <p className="text-lg font-bold">{priceFormat(order.total)}</p>
                        </div>

                        {
                            user.isAdmin &&
                            <div className="bg-gray-300 rounded-md p-4 flex justify-between items-center">
                                <div className="flex flex-col w-1/2">
                                    <label className="text-xs font-bold mb-1">Edit Notes:</label>
                                    <textarea type="text" value={notes} className="w-full text-sm bg-gray-200 text-gray-700 rounded" onChange={(e)=>{ setNotes(e.target.value) }}></textarea>
                                </div>
                                <div className="flex flex-col ">
                                    <label className="text-xs font-bold mb-1">Update Status:</label>
                                    <select className="outline-none px-3 text-xs font-semibold py-2 bg-specialColor/20 text-specialColor rounded" value={status} onChange={(e)=>{setStatus(e.target.value)}}>
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </div>
                                <button className="ml-2 px-4 py-2 bg-specialColor/90 text-sm font-semibold text-white rounded hover:" onClick={updateOrder}>{isUpdating ? "Wait..." : "Update"}</button>
                            </div>
                        }
                    </div>
                </div>
                
            }
            
        </>
    );
}