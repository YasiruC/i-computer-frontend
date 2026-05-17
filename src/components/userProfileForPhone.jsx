import { use } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { FaRegUser } from "react-icons/fa6";

export default function UserProfileForPhone(){

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
            <div className="h-full relative aspect-square rounded-xl overflow-hidden">
                <img src={user.image} referrerPolicy="no-referrer" alt="" className={`object-cover text-white absolute ${user.image === "/image/default-profile.png" ? "bg-accent p-4" : "bg-white/95"}`}/>
               <select className="w-full absolute bg-transparent text-transparent aspect-square outline-none text-center"
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
                    <option className="bg-accent rounded-lg text-white" value="option1">{user.firstName} {user.lastName}</option>
                    <option className="bg-accent rounded-lg text-white" value="option2">Orders</option>
                    <option className="bg-accent rounded-lg text-white" value="option3">Settings</option>
                    <option className="bg-accent rounded-lg text-white" value="option4">Logout</option>
                </select>
            </div>
        ) : (
            <div className="lg:w-full h-full flex items-center lg:justify-center gap-3">
                <button className="h-full aspect-square flex justify-center items-center rounded-xl bg-accent text-white text-3xl" onClick={() => (window.location.href = "/login")}>
                    <FaRegUser />
                </button>
            </div>
        )
    );
}