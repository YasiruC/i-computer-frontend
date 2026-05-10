import { Link } from "react-router-dom";
import { MdAdd, MdInventory2, MdFilterList, MdSearch } from "react-icons/md";
import { HiOutlineCube } from "react-icons/hi2";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { MdDeleteOutline, MdEditCalendar  } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import LoadingAnimation from "../../components/loadingAnimation.jsx";
import ProductDeleteModal from "../../components/productDeleteModal.jsx";

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(
        () => {
            if(!isLoaded){
                const token = localStorage.getItem("token");

                axios.get(import.meta.env.VITE_API_URL + "/products", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }).then((response) => {
                    setProducts(response.data);
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
                            Products
                        </h1>
                        <p className="text-sm text-secondary">
                            {products.length} items in inventory
                        </p>
                    </div>
                </div>

                <Link
                    to="/admin/add-product"
                    className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow hover:bg-specialColor hover:text-accent transition-all duration-200"
                >
                    <MdAdd className="text-lg" />
                    Add Product
                </Link>
            </div>

            {/* ── Table Card ── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-hidden">
                    {
                        isLoaded ? 
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="text-left px-5 py-3.5 font-semibold text-secondary text-xs uppercase tracking-wider">Images</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-secondary text-xs uppercase tracking-wider">Product ID</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-secondary text-xs uppercase tracking-wider">Name</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-secondary text-xs uppercase tracking-wider">Price</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-secondary text-xs uppercase tracking-wider">Label Price</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-secondary text-xs uppercase tracking-wider">Brand</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-secondary text-xs uppercase tracking-wider">Model</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-secondary text-xs uppercase tracking-wider">Category</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-secondary text-xs uppercase tracking-wider">Available</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-secondary text-xs uppercase tracking-wider">Stock</th>
                                    <th className="text-left px-5 py-3.5 font-semibold text-secondary text-xs uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {
                                    products.map(
                                        (product, index) => {
                                            return (
                                                <tr key={index} className="hover:bg-gray-200 transition-colors duration-100 group">

                                                    {/* images */}
                                                    <td className="px-5 py-3.5">
                                                        <div className="w-11 h-11 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center border border-gray-200">
                                                            <img
                                                                src={product.images[0]}
                                                                alt={product.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    </td>

                                                    {/* productId */}
                                                    <td className="px-5 py-3.5">
                                                        <span className="font-mono text-xs bg-gray-100 text-secondary px-2 py-1 rounded-md">
                                                            {product.productId}
                                                        </span>
                                                    </td>

                                                    {/* name */}
                                                    <td className="px-5 py-3.5">
                                                        <span className="font-semibold text-accent group-hover:text-hoverColor transition-colors">
                                                            {product.name}
                                                        </span>
                                                    </td>

                                                    {/* price */}
                                                    <td className="px-5 py-3.5">
                                                        <span className="font-bold text-accent">
                                                            ${product.price}
                                                        </span>
                                                    </td>

                                                    {/* labelPrice */}
                                                    <td className="px-5 py-3.5">
                                                        <span className="text-secondary line-through text-xs">
                                                            ${product.labelPrice}
                                                        </span>
                                                    </td>

                                                    {/* brand */}
                                                    <td className="px-5 py-3.5 text-secondary">
                                                        {product.brand}
                                                    </td>

                                                    {/* model */}
                                                    <td className="px-5 py-3.5 text-secondary text-xs">
                                                        {product.model}
                                                    </td>

                                                    {/* category */}
                                                    <td className="px-5 py-3.5">
                                                        <span className="bg-accent/10 text-accent text-xs font-medium px-2.5 py-1 rounded-full">
                                                            {product.category}
                                                        </span>
                                                    </td>

                                                    {/* isAvailble */}
                                                    <td className="px-5 py-3.5">
                                                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${product.isAvailble ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full ${product.isAvailble ? "bg-green-500" : "bg-red-400"}`} />
                                                            {product.isAvailble ? "Yes" : "No"}
                                                        </span>
                                                    </td>

                                                    {/* stock */}
                                                    <td className="px-5 py-3.5">
                                                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${product.stock > 10 ? "bg-green-50 text-green-700" : product.stock > 0 ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-600"}`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full ${product.stock > 10 ? "bg-green-500" : product.stock > 0 ? "bg-yellow-400" : "bg-red-400"}`} />
                                                            {product.stock}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-3.5 text-xl text-accent  gap-3">
                                                        <Link 
                                                            to="/admin/update-product"
                                                            state={product}
                                                            className="mb-2 flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-xl font-semibold shadow hover:bg-specialColor hover:text-accent transition-all duration-200"
                                                        >
                                                        <TiEdit />
                                                        </Link>

                                                        <ProductDeleteModal product = {product} refresh = { ()=>{ setIsLoaded(false) } }/>
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
        </div>
    );
}