import { useState } from "react";
import api from "../utils/api.js";
import toast from "react-hot-toast";

export default function CreateOrderModal(props){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressLineOne, setAddressLineOne] = useState("");
    const [addressLineTwo, setAddressLineTwo] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const cart = props.cart;

    async function handleOrder() {
        try{
            const orderData = {
                firstName,
                lastName,
                addressLineOne,
                addressLineTwo,
                city,
                state,
                postalCode,
                phone,
                items : []
            }

            for(let i = 0;i < cart.length;i++){
                orderData.items.push(
                    {
                        productId : cart[i].product.productId,
                        quantity : cart[i].quantity
                    }
                );
            }

            const token = localStorage.getItem("token");

            await api.post("/orders",orderData,{
                headers : {
                    Authorization : "Bearer " + token
                }
            });

            toast.success("Order place succesfull");
            setIsModalOpen(false);
        }catch(error){
            toast.error(error?.response?.data?.message || "Some thing is wrong");
            setIsModalOpen(false);
        }


    }

    return(
        <>
            <button 
                className="bg-accent text-white px-4 py-2 rounded-lg font-semibold hover:bg-specialColor hover:text-accent transition-all duration-200"
                onClick={()=>{ setIsModalOpen(true) }}
            >
            Order
            </button>
            {
                isModalOpen && 
                <div className="fixed bg-black/70 w-screen h-screen top-0 left-0 flex justify-center items-center">
                    <div className="w-[400px] bg-white rounded-lg p-5 flex flex-col gap-4">
                        <h1 className="text-2xl font-bold text-accent">Shipping Details</h1>
                        <input type="text" placeholder="First Name" className="w-full border p-2 rounded" value={firstName} onChange={(e)=>{ setFirstName(e.target.value) }} />
                        <input type="text" placeholder="Last Name" className="w-full border p-2 rounded" value={lastName} onChange={(e)=>{ setLastName(e.target.value) }} />
                        <input type="text" placeholder="Address Line One" className="w-full border p-2 rounded" value={addressLineOne} onChange={(e)=>{ setAddressLineOne(e.target.value) }} />
                        <input type="text" placeholder="Address Line Two" className="w-full border p-2 rounded" value={addressLineTwo} onChange={(e)=>{ setAddressLineTwo(e.target.value) }} />
                        <input type="text" placeholder="City" className="w-full border p-2 rounded" value={city} onChange={(e)=>{ setCity(e.target.value) }} />
                        <input type="text" placeholder="State" className="w-full border p-2 rounded" value={state} onChange={(e)=>{ setState(e.target.value) }} />
                        <input type="text" placeholder="Postal Code" className="w-full border p-2 rounded" value={postalCode} onChange={(e)=>{ setPostalCode(e.target.value) }} />
                        <input type="text" placeholder="Phone No" className="w-full border p-2 rounded" value={phone} onChange={(e)=>{ setPhone(e.target.value) }} />
                        <div className="w-full flex flex-row justify-between items-center">
                            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-accent transition-colors duration-300" onClick={()=>{ setIsModalOpen(false) }}>Cancel</button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300" onClick={handleOrder}
                            >
                            Place Order
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}