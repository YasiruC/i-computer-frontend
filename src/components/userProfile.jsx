import { use } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function UserProfile(){

    const [user,setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(
        ()=>{
            const token = localStorage.getItem("token");
            if(token){
                api.get("/users/profile",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }).then((response) => {
                    setUser(response.data);
                }).catch((error)=>{
                    console.error("Error fetching user profile:", error);
                });
            }
        },[]
    );

    return(
        user ? (
            <div className="w-[58%] h-full flex items-center justify-center text-sm font-semibold text-white gap-2">
                <img src={user.image} referrerPolicy="no-referrer" alt="" className="w-10 h-10 rounded-full object-cover bg-white/95  text-white" />
               <select className="appearance-none  text-white text-[15px] font-semibold rounded-xl px-4 py-2 shadow-md cursor-pointer outline-none transition-all duration-200 hover:bg-hoverColor hover:shadow-lg  text-center"
                    onChange={(e)=>{
                        if(e.target.value === "option1"){
                            navigate("/");
                        }else if(e.target.value === "option2"){
                            navigate("/orders");
                        }else if(e.target.value === "option3"){
                            navigate("/setting");
                        }else if(e.target.value === "option4"){
                            localStorage.removeItem("token");
                            navigate("/login");
                        }
                    }}
               >
                    <option className="bg-accent rounded-lg" value="option1">{user.firstName} {user.lastName}</option>
                    <option className="bg-accent rounded-lg" value="option2">Orders</option>
                    <option className="bg-accent rounded-lg" value="option3">Settings</option>
                    <option className="bg-accent rounded-lg" value="option4">Logout</option>
                </select>
            </div>
        ) : (
            <div className="w-full h-full flex items-center justify-center gap-3">
                <button className="bg-hoverColor font-semibold text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => (window.location.href = "/login")}>
                    Login
                </button>
                <button className="bg-hoverColor font-semibold text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => (window.location.href = "/register")}>
                    Register
                </button>
            </div>
        )
    );
}