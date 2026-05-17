import api from "../utils/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage(){
    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");
    const navigate = useNavigate();

    async function handleRegister(){
        if(password !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        try{
            await api.post("/users/register" , {
                firstName : firstName,
                lastName : lastName,
                email : email,
                password : password
            });

            navigate("/login");
            toast.success("User registered successfully");
        }catch(error){
            toast.error(error?.response?.data?.message);
        }
    }
    
    return(
        <div className="w-full h-screen flex justify-center items-center bg-[url('/login-bg.jpg')] bg-center bg-cover">
            <div className="w-0 lg:w-1/2 h-full">
            
            </div>

            <div className="w-[90%] lg:w-1/2 h-full flex justify-center items-center">
                <div className="w-[500px] h-[550px] backdrop-blur-xl rounded-3xl shadow-2xl shadow-accent flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold mb-8 text-accent">Sign Up</h1>

                    <div className="w-3/4 flex items-center gap-4 mb-6">
                        <input
                            onChange={
                                (event)=>{
                                    setFirstName(event.target.value);
                                }
                            }
                            value={firstName}
                            type="text" 
                            placeholder="First Name" 
                            className="w-1/2 p-3 rounded-lg text-accent border border-accent focus:border-none focus:outline-none focus:ring-2 focus:ring-specialColor"
                        />
                        <input
                            onChange={
                                (event)=>{
                                    setLastName(event.target.value);
                                }
                            }
                            value={lastName}
                            type="text" 
                            placeholder="Last Name" 
                            className="w-1/2 p-3 rounded-lg text-accent border border-accent focus:border-none focus:outline-none focus:ring-2 focus:ring-specialColor"
                        />
                    </div>
                    
                    <input
                        onChange={
                            (event)=>{
                                setEmail(event.target.value);
                            }
                        }
                        value={email}
                        type="text" 
                        placeholder="Email" 
                        className="w-3/4 p-3 mb-6 rounded-lg text-accent border border-accent focus:border-none focus:outline-none focus:ring-2 focus:ring-specialColor"
                    />
                    <input
                        onChange={
                            (event)=>{
                                setPassword(event.target.value);
                            }
                        }
                        value={password}
                        type="password" 
                        placeholder="Password" 
                        className="w-3/4 p-3 mb-6 rounded-lg text-accent border border-accent focus:border-none focus:outline-none focus:ring-2 focus:ring-specialColor"
                    />
                    <input
                        onChange={
                            (event)=>{
                                setConfirmPassword(event.target.value);
                            }
                        }
                        value={confirmPassword}
                        type="password" 
                        placeholder="Confirm Password" 
                        className="w-3/4 p-3 mb-6 rounded-lg text-accent border border-accent focus:border-none focus:outline-none focus:ring-2 focus:ring-specialColor"
                    />
                    <button onClick={handleRegister} className="mb-6 w-3/4 p-3 bg-specialColor text-[#ffffff] text-xl rounded-lg ">
                        Sign Up
                    </button>

                    <p className="w-3/4 text-center text-secondary">
                        Alredy have an account?
                        <Link to="/login" className="text-accent"> Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}