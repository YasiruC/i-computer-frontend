import { Link, Route, Routes } from "react-router-dom";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductPage";

export default function AdminPage(){
    return (
        <div className= "w-full h-full bg-accent flex">
            <div className="w-[300px] h-full text-[#ffffff] text-xl">
                <Link to="/admin/" className="block py-2 px-4 hover:bg-gray-700">Orders</Link>
                <Link to="/admin/products" className="block py-2 px-4 hover:bg-gray-700">Products</Link>
                <Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-700">Users</Link>
                <Link to="/admin/reviews" className="block py-2 px-4 hover:bg-gray-700">Reviews</Link>
            </div>
            <div className="w-[calc(100%-300px)] h-full bg-primary border-[10px] border-accent rounded-2xl">
                <Routes>
                    <Route path="/" element={<h1>Order Dashboad</h1>} />
                    <Route path="/products" element={<AdminProductsPage />} />
                    <Route path="/add-product" element={<AdminAddProductPage />} />
                    <Route path="/users" element={<h1>Users Dashboad</h1>} />
                    <Route path="reviews" element={<h1>Reviews Dashboad</h1>} /> 
                </Routes>
            </div>
        </div>
    )
}