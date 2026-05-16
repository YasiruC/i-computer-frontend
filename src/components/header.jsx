import { Link } from "react-router-dom";
import { FaCartPlus  } from "react-icons/fa";
import UserProfile from "./userProfile";

export default function Header(){
    return (
        <header className="w-full h-[100px] bg-accent flex items-center justify-between shrink-0">
            <Link to="/" className="w-[200px] h-full  flex justify-center items-center">
                <img src="/logo.jpeg" alt="" className="h-[70px] object-cover  rounded-full" />
            </Link>

            <div className="h-full w-[400px] flex justify-center items-center gap-3">
                <Link to="/" className="text-white text-lg font-semibold p-3 shadow hover:bg-hoverColor transition-colors duration-300 rounded-xl" >Home</Link>
                <Link to="/products" className="text-white text-lg font-semibold p-3 hover:bg-hoverColor  transition-colors duration-300 rounded-xl" >Product</Link>
                <Link to="/contact-us" className="text-white text-lg font-semibold p-3 hover:bg-hoverColor  transition-colors duration-300 rounded-xl" >Contact Us</Link>
            </div>
            
            

            <div className="w-70 h-12.5 flex justify-between items-center mr-8">
                <Link to="/cart" className="w-12.5 h-12.5 flex justify-center items-center">
                    <FaCartPlus  className="text-[30px] text-white hover:text-hoverColor"/>
                </Link>
                <UserProfile className="flec justify-end"/>
            </div>
        </header>
    )
}