import { useState } from "react";
import { addToCart, getCart, getCartTotal } from "../utils/cart";
import priceFormat from "../utils/priceFormat";
import { MdAddCircle  } from "react-icons/md";
import { FaMinusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CartPage(){

    const [cart, setCart] = useState(getCart);

    return(
        <div className="w-full min-h-full flex flex-col items-center p-5 gap-4 pb-43 lg:pb-20">
            {
                cart.map(
                    (cartItem, index)=>{
                        return(
                            <div 
                                key={index}
                                className="bg-white w-[99%] lg:w-[500px] h-[190px] lg:h-[150px] rounded-lg shadow-2xl shadow-gray-300 flex items-center p-3 lg:relative justify-between flex-col lg:flex-row"
                            >
                                <div className="flex flex-row items-center">
                                    <img src={cartItem.product.image} alt={cartItem.product.name} className="w-[100px] h-[100px] rounded-lg object-cover"/> 

                                    <div className="h-full w-[190px] lg:w-[400px] pl-5 flex flex-col justify-center">
                                        <h1 className="text-lg font-semibold">{cartItem.product.name}</h1>
                                        <p className="text-sm text-secondary">{cartItem.product.productId}</p>
                                        {
                                            cartItem.product.labelPrice > cartItem.product.price && 
                                            <p className="text-sm text-secondary mt-2 line-through">{priceFormat(cartItem.product.labelPrice)}</p>
                                        }
                                        <p className="text-sm text-accent font-semibold">{priceFormat(cartItem.product.price)}</p>
                                    </div>
                                </div>

                                <div className="static w-full lg:w-[200px] h-10 lg:h-full lg:absolute right-2 top-0 flex flex-row lg:flex-col lg:justify-end justify-between items-end lg:p-2">
                                        <div className="w-[100px] h-[30px] border border-black rounded-full flex items-center justify-between p-2">
                                            <button 
                                                className="text-xl font-bold cursor-pointer hover:text-accent"
                                                onClick={()=>{
                                                    addToCart(cartItem.product, -1);
                                                    setCart(getCart());
                                                }}
                                            >
                                            <FaMinusCircle />
                                            </button>
                                            <span className="">{cartItem.quantity}</span>
                                            <button 
                                                className="text-2xl font-bold cursor-pointer hover:text-accent"
                                                onClick={()=>{
                                                    addToCart(cartItem.product, 1);
                                                    setCart(getCart());
                                                }}
                                            >
                                            <MdAddCircle  />
                                            </button>
                                        </div>
                                        <p className="text-xl mt-2"><span className="text-secondary font-semibold">{priceFormat(cartItem.product.price * cartItem.quantity)}</span></p>
                                    </div>
                            </div>
                        )
                    }
                )
            }

            <div className="bg-white w-[98%] lg:w-[500px] border rounded-t-lg shadow-2xl shadow-gray-300 flex items-center justify-between p-3 fixed bottom-21 lg:bottom-0">
                <Link 
                    className="bg-accent text-white px-4 py-2 rounded-lg font-semibold hover:bg-specialColor hover:text-accent transition-all duration-200"
                    to="/checkout"
                    state={cart}
                >
                    Checkout
                </Link>
                <p className="text-xl font-bold ml-4">{priceFormat(getCartTotal(cart))}</p>
            </div>

        </div>
    );
}