import { useState } from "react";
import Header from "../components/header";
import uploadMedia from "../utils/mediaUpload";
import toast from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./productPage";
import ProductOverViewPage from "./productOverviewPage";
import CartPage from "./cartPage";
import CheckoutPage from "./CheckoutPage";

export default function HomePage(){

    return (
        <div className = "w-full h-screen flex flex-col">
            <Header />
            <div className="w-full h-[calc(100%-100px)] overflow-y-scroll">
                <Routes >
                    <Route path="/" element={<h1>Homa page</h1>} />
                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/contact-us" element={<h1>Contact Us page</h1>} />
                    <Route path="/overview/:productId" element={<ProductOverViewPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                </Routes>
            </div>

        </div>
    )
}