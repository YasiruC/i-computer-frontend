import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import LoadingAnimation from "../components/loadingAnimation"
import ImageSlideShow from "../components/imageSlidesShow";
import priceFormat from "../utils/priceFormat";
import { addToCart, getCart } from "../utils/cart";

export default function ProductOverViewPage(){

    const parameters = useParams()
    const [product , setProduct] = useState(null);
    const [status, setStatus] = useState("loading");
    const navigate = useNavigate();
    useEffect(
        ()=>{
            api.get("products/" + parameters.productId).then(
                (response)=>{
                    setProduct(response.data);
                    setStatus("success");
                }
            ).catch(
                (error)=>{
                    setStatus("error");
                    toast.error(error?.response?.data?.message || "An error occurred while fetching product details.");
                }
            )
        }
        ,[]
    )

    return(
        <div className="">
            {
                status == "loading" && <LoadingAnimation />
            }

            {
                status == "error" && 
                <div className="w-full h-[300px] flex flex-col items-center justify-center gap-4">
                    <h1 className="text-2xl font-bold">Failed to load product details</h1>
                    <Link to={"/products"} className="px-4 py-2 bg-accent text-white rounded" >Back to products</Link>
                </div>
            }

            {
                status == "success" && 
                <div className="w-full h-full flex">
                    <div className="w-1/2 h-full flex justify-center items-center">
                        <ImageSlideShow images = {product.images} productName = {product.name} />
                    </div>

                    <div className="w-1/2 h-full flex flex-col p-5 ">
                        <h1 className="text-3xl font-bold text-accent  mt-5">
                            {product.name}
                            {
                                product.altNames.map(
                                    (altName, index)=>{
                                        return(
                                            <span key={index} className="text-secondary"> | {altName}</span>
                                        );
                                    }
                                )
                            }
                        </h1>
                        <span className="text-sm text-secondary mt-5">{product.productId}</span>

                        <div className="w-full mt-5 flex flex-col">
                            <span className="text-accent font-semibold text-5xl">
                                {
                                    priceFormat(product.price)
                                }
                            </span>
                                {
                                    product.labelPrice > product.price &&
                                    <span className="text-secondary text-xl line-through">
                                        { priceFormat(product.labelPrice) }
                                    </span>
                                }
                        </div>

                        <div className="w-full mt-5 flex gap-10">
                            <span className="text-lg text-secondary font-semibold">{product.brand}</span>
                            <span className="text-lg text-secondary font-semibold ">{product.model}</span>
                            <span className="text-lg text-secondary font-semibold ">{product.category}</span>
                        </div>

                        <p className="text-lg mt-5">
                            {
                                product.description
                            }
                        </p>

                        <div className="flex mt-5 gap-5">
                            <button 
                                className="w-62.5 h-16 bg-blue-500 text-white text-xl font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-400"
                                onClick={()=>{
                                    addToCart(product,1);
                                }}
                            >
                                Add to Cart
                            </button>
                            <Link 
                                className="w-62.5 h-16 bg-specialColor text-white text-xl font-semibold rounded-lg cursor-pointer hover:bg-amber-500 transition-colors duration-400 flex justify-center items-center"
                                to="/checkout"
                                state={
                                    [
                                        {
                                            product : {
                                                productId : product.productId,
                                                name : product.name,
                                                image : product.images[0],
                                                labelPrice : product.labelPrice,
                                                price : product.price
                                            },
                                            quantity : 1
                                        }
                                    ]
                                }
                            >
                                Buy Now
                            </Link>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
}