import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage(){
    const [email , setEmail] = useState();
    const [password , setPassword] = useState();

    function hadleLogin(){
        axios.post(import.meta.env.VITE_API_URL + "/users/login" , {
            email : email,
            password : password
        }).then(
            (res)=>{
                console.log("Login Successful", res.data.token);
            }
        ).catch(
            (error)=>{
                console.log("Login Failed", error);    
            }
        );
    }
    return(
        <div className="w-full h-full flex justify-center items-center bg-[url('/login-bg.jpg')] bg-center bg-cover">
            <div className="w-1/2 h-full">
            
            </div>

            <div className="w-1/2 h-full flex justify-center items-center">
                <div className="w-[400px] h-[500px] backdrop-blur-xl rounded-3xl shadow-2xl shadow-accent flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold mb-8 text-accent">Sign in</h1>
                    
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
                        className="w-3/4 p-3 mb-2 rounded-lg text-accent border border-accent focus:border-none focus:outline-none focus:ring-2 focus:ring-specialColor"
                    />

                    <p className="mb-6 w-3/4 text-right text-secondary">
                        Forget password?
                        <Link to="/forget-password" className="text-accent"> Click here</Link>
                    </p>

                    <button onClick={hadleLogin} className="mb-6 w-3/4 p-3 bg-specialColor text-[#ffffff] text-xl rounded-lg ">
                        Sign in
                    </button>

                    <p className="w-3/4 text-center text-secondary">
                        Don't have to account?
                        <Link to="/register" className="text-accent"> Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}