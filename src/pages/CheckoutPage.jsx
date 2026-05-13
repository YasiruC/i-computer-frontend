import { useState } from "react";
import { addToCart, getCart, getCartTotal } from "../utils/cart";
import priceFormat from "../utils/priceFormat";
import { MdAddCircle  } from "react-icons/md";
import { FaMinusCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import CreateOrderModal from "../components/createOrderModal";

export default function CheckoutPage(){

    const location = useLocation();
    const [cart, setCart] = useState(location?.state);

    return(
        <div className="w-full min-h-full flex flex-col items-center p-5 gap-4 pb-20">
            {
                cart.map(
                    (cartItem, index)=>{
                        return(
                            <div 
                                key={index}
                                className="bg-white w-[500px] h-[150px] rounded-lg shadow-2xl shadow-gray-300 flex items-center p-3 relative"
                            >
                                <img src={cartItem.product.image} alt={cartItem.product.name} className="w-[100px] h-[100px] rounded-lg object-cover"/> 

                                <div className="h-full w-[400px] pl-5">
                                    <h1 className="text-lg font-semibold">{cartItem.product.name}</h1>
                                    <p className="text-sm text-secondary">{cartItem.product.productId}</p>
                                    {
                                        cartItem.product.labelPrice > cartItem.product.price && 
                                        <p className="text-sm text-secondary mt-2 line-through">{priceFormat(cartItem.product.labelPrice)}</p>
                                    }
                                    <p className="text-sm text-accent font-semibold">{priceFormat(cartItem.product.price)}</p>

                                    <div className="w-[200px] h-full absolute right-2 top-0 flex flex-col justify-end items-end p-2">
                                        <div className="w-[100px] h-[30px] border border-black rounded-full flex items-center justify-between p-2">
                                            <button 
                                                className="text-xl font-bold cursor-pointer hover:text-accent"
                                                onClick={()=>{
                                                    let newCart = [...cart];
                                                    newCart[index].quantity -= 1;

                                                    if(newCart[index].quantity <=0 ){
                                                        newCart.splice(index, 1);
                                                    }
                                                    setCart(newCart)
                                                        
                                                }}
                                            >
                                            <FaMinusCircle />
                                            </button>
                                            <span className="">{cartItem.quantity}</span>
                                            <button 
                                                className="text-2xl font-bold cursor-pointer hover:text-accent"
                                                onClick={()=>{
                                                    let newCart = [...cart];
                                                    newCart[index].quantity += 1;
                                                    setCart(newCart)
                                                }}
                                            >
                                            <MdAddCircle  />
                                            </button>
                                        </div>
                                        <p className="text-xl mt-2"><span className="text-secondary font-semibold">{priceFormat(cartItem.product.price * cartItem.quantity)}</span></p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                )
            }

            <div className="bg-white w-[500px] border rounded-t-lg shadow-2xl shadow-gray-300 flex items-center justify-between p-3 fixed bottom-0">
                <CreateOrderModal cart={cart} />
                <p className="text-xl font-bold ml-4">{priceFormat(getCartTotal(cart))}</p>
            </div>

        </div>
    );
}