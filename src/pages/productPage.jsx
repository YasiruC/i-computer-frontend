import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../components/productCard";
import api from "../utils/api";

export default function ProductPage(){

    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(
        ()=>{
            if(!isLoading){
                axios.get(import.meta.env.VITE_API_URL + "/products").then(
                    (response)=>{
                        setProducts(response.data);
                        setIsLoading(true);
                    }
                ).catch(
                    (error)=>{
                        toast.error(error?.response?.data);
                    }
                )
            }
        }
        ,[isLoading]
    )

    async function searchProducts(){
        try{
            const response = await api.get("/products/search/" + searchQuery);
            setProducts(response.data);
        }catch(error){
            console.error("Error searching products:", error);
            toast.error("Failed to search products");
        }
    }


    return(
        <div className="w-full h-full flex justify-center flex-wrap relative pt-20">
            <div className="w-full absolute top-0 left-0 h-[100px] flex items-center justify-center gap-4">
                <input value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value)}} type="text" placeholder="Search products..." className="w-1/2 p-3 rounded-lg border border-gray-400 focus:outline-none focus:border-none focus:ring-2 focus:ring-specialColor"/>
                <button className="bg-specialColor text-white p-3 rounded-lg hover:bg-hoverColor" onClick={searchProducts}>Search</button>
                <button className="bg-specialColor text-white p-3 rounded-lg hover:bg-hoverColor" onClick={()=>{setIsLoading(false); setSearchQuery("");}}>All Product</button>
            </div>
            {
                products.map(
                    (product, index)=>{
                        return(
                            <ProductCard key={index} product={product} />
                        );
                    }
                )
            }
            <div className=" w-full h-[80px] lg:h-0.5"></div>
        </div>
    );
}