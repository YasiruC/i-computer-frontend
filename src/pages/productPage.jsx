import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../components/productCard";

export default function ProductPage(){

    const [products, setProducts] = useState([]);
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


    return(
        <div className="w-full h-full flex justify-center flex-wrap">
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