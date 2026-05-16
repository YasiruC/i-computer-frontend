import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import UserProfileForPhone from "./userProfileForPhone";

export default function BottomNavigationBar(){
    return (
        <div className="flex lg:hidden justify-evenly fixed bottom-0 w-full h-[80px] p-2 bg-white shadow-[0_-4px_12px_-4px_rgba(0,0,0,25)]">
            <Link to="/" className="h-full aspect-square flex justify-center items-center rounded-xl bg-accent text-white text-3xl">
                <GoHome />
            </Link>
            <Link to="/products" className="h-full aspect-square flex justify-center items-center rounded-xl bg-accent text-white text-3xl">
                <IoIosSearch />
            </Link>
            <Link to="/cart" className="h-full aspect-square flex justify-center items-center rounded-xl bg-accent text-white text-3xl">
                <LuShoppingCart />
            </Link>
            <UserProfileForPhone className="h-full aspect-square flex justify-center items-center rounded-xl bg-accent text-white text-3xl"/>
        </div>
    )
}