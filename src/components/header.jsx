import { Link } from "react-router-dom";
import { FaCartPlus  } from "react-icons/fa";

export default function Header(){
    return (
        <header className="w-full h-[100px] bg-accent relative flex items-center justify-center shrink-0">
            <Link to="/" className="w-[200px] h-full absolute left-10 flex justify-center items-center">
                <img src="/logo.jpeg" alt="" className="h-[70px] object-cover  rounded-full" />
            </Link>

            <div className="h-full w-[400px] flex justify-center items-center gap-8">
                <Link to="/" className="text-white text-lg font-semibold p-3 shadow hover:bg-specialColor hover:text-accent rounded-xl" >Home</Link>
                <Link to="/products" className="text-white text-lg font-semibold p-3 hover:bg-specialColor hover:text-accent rounded-xl" >Product</Link>
                <Link to="/contact-us" className="text-white text-lg font-semibold p-3 hover:bg-specialColor hover:text-accent rounded-xl" >Contact Us</Link>
            </div>
            
            <Link to="/cart" className="w-12.5 h-12.5 absolute right-10 flex justify-center items-center">
                <FaCartPlus  className="text-2xl text-white"/>
            </Link>
        </header>
    )
}