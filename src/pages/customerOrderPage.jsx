import { Link } from "react-router-dom";
import { MdAdd, MdInventory2, MdFilterList, MdSearch } from "react-icons/md";
import { HiOutlineCube } from "react-icons/hi2";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { MdDeleteOutline, MdEditCalendar  } from "react-icons/md";
import LoadingAnimation from "../components/loadingAnimation.jsx";
import ProductDeleteModal from "../components/productDeleteModal.jsx";
import priceFormat from "../utils/priceFormat.js";
import OrderDetailsModal from "../components/orderDetailsModal.jsx";

export default function CustomerOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [ordersCount, setOrdersCount] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(
        () => {
            if(!isLoaded){
                const token = localStorage.getItem("token");

                axios.get(import.meta.env.VITE_API_URL + "/orders/" + pageSize + "/" + currentPage, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }).then((response) => {
                    setOrders(response.data.orders);
                    setTotalPages(response.data.totalPages);
                    setOrdersCount(response.data.ordersCount);
                    setIsLoaded(true);
                }).catch((error) => {
                    toast.error(error?.response?.data);
                });
            }
        }
        , [isLoaded]
    );
    
    return (
        <div className="w-full h-full bg-primary px-6 py-8 overflow-y-scroll">

            {/* ── Header ── */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white text-xl shadow-md">
                        <MdInventory2 />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-accent leading-tight tracking-tight">
                            Orders
                        </h1>
                        <p className="text-sm text-secondary">
                            Total Orders {ordersCount}
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Table Card ── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-scroll">
                <div className="">
                    {
                        isLoaded ? 
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="text-left px-5 py-3.5 font-semibold text-secondary text-xs uppercase tracking-wider">Order ID</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-secondary text-xs uppercase tracking-wider">Email</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-secondary text-xs uppercase tracking-wider">First Name</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-secondary text-xs uppercase tracking-wider">Last Name</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-secondary text-xs uppercase tracking-wider">Phone No</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-secondary text-xs uppercase tracking-wider">Date</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-secondary text-xs uppercase tracking-wider">Total</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-secondary text-xs uppercase tracking-wider">Status</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-secondary text-xs uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {
                                    orders.map(
                                        (order, index) => {
                                            return (
                                                <tr key={index} className="hover:bg-gray-200 transition-colors duration-100 group">

                                                    <td className="px-5 py-3.5">
                                                        <span className="font-mono text-xs bg-gray-100 text-secondary px-2 py-1 rounded-md">
                                                            {order.orderId}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-3.5">
                                                        <span className="font-semibold text-accent group-hover:text-hoverColor transition-colors">
                                                            {order.email}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-3.5 text-secondary">
                                                        {order.firstName}
                                                    </td>

                                                    <td className="px-5 py-3.5 text-secondary text-xs">
                                                        {order.lastName}
                                                    </td>

                                                    <td className="px-5 py-3.5">
                                                        <span className="bg-accent/10 text-accent text-xs font-medium px-2.5 py-1 rounded-full">
                                                            {order.phone}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-3.5">
                                                        <span className="font-bold text-accent">
                                                            {new Date(order.date).toLocaleDateString()}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-3.5">
                                                        <span className="font-bold text-accent">
                                                            {priceFormat(order.total)}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-3.5">
                                                        <span className="font-bold text-accent">
                                                            {order.orderState}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-3.5 text-xl text-accent  gap-3">
                                                        <OrderDetailsModal order={order} refresh = {()=>{setIsLoaded(false)}}/>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )
                                }
                            </tbody>
                        </table>
                        :
                        <LoadingAnimation />
                    }
                </div>
            </div>

            <div className="w-full flex justify-end items-center gap-3 mt-4">
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-300"
                    onClick={()=>{
                        if(currentPage > 1){
                            setCurrentPage(currentPage - 1);
                            setIsLoaded(false)
                        }
                    }}  
                >
                Previous
                </button>
                <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-300"
                    onClick={()=>{
                        if(currentPage < totalPages){
                            setCurrentPage(currentPage + 1);
                            setIsLoaded(false);
                       }
                    }}
                >
                Next
                </button>
                
                <select
                    value={pageSize}
                    onChange={(e)=>{
                        setPageSize(parseInt(e.target.value));
                        setIsLoaded(false);
                    }}
                    className="ml-4 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-300"
                >
                    <option value={2}>2</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                </select>
            </div>
        </div>
    );
}