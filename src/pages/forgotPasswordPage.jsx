import { useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage(){
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    function sendEmail(){
        api.post("/users/send-otp", {
            email: email
        }).then((response)=>{
            setIsEmailSent(true);
            toast.success("OTP sent to your email address!");
        }).catch((error)=>{
            toast.error(error?.response?.data?.message);
        });
    }

    async function resetPassword(){
        if(newPassword !== confirmPassword){
            toast.error("Passwords do not match!");
            return;
        }
        try {
            await api.post("/users/reset-password", {
                email: email,
                otp: otp,
                newPassword: newPassword
            });
            toast.success("Password reset successfully!");
            navigate("/login");
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    return(
        <div className="w-full h-screen flex justify-center items-center bg-black/30">
            {
                !isEmailSent ?
                <div className="w-[90%] lg:w-[500px] h-[400px] bg-white flex justify-center items-center flex-col p-3 rounded-xl shadow-2xl">
                    <h1 className="text-4xl font-bold mb-8 text-accent">Forgot Password</h1>
                    <p className="w-3/4 text-secondary mb-6">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-3/4 p-3 mb-6 rounded-lg text-accent border border-accent focus:border-none focus:outline-none focus:ring-2 focus:ring-specialColor"
                        onChange={(e)=>{
                            setEmail(e.target.value);
                        }}
                        value={email}
                    />
                    <button className="w-1/2 p-3 bg-specialColor text-[#ffffff] text-xl rounded-lg " onClick={sendEmail}>
                        Send Reset Link
                    </button>
                </div>
                : 
                <div className="w-full h-screen flex justify-center items-center bg-black/30">
                    <div className="w-[90%] lg:w-[500px] h-[550px] bg-white flex justify-center items-center flex-col p-3 rounded-xl shadow-2xl">
                        <h1 className="text-4xl font-bold mb-8 text-accent">Forgot Password</h1>
                        <p className="w-3/4 text-secondary mb-6">
                            We have sent an OTP to your email address. Please enter the OTP and your new password to reset your password.
                        </p>
                        <input
                            type="text"
                            placeholder="OTP"
                            className="w-3/4 p-3 mb-6 rounded-lg text-accent border border-accent focus:border-none focus:outline-none focus:ring-2 focus:ring-specialColor"
                            onChange={(e)=>{
                                setOtp(e.target.value);
                            }}
                            value={otp}
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-3/4 p-3 mb-6 rounded-lg text-accent border border-accent focus:border-none focus:outline-none focus:ring-2 focus:ring-specialColor"
                            onChange={(e)=>{
                                setNewPassword(e.target.value);
                            }}
                            value={newPassword}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-3/4 p-3 mb-6 rounded-lg text-accent border border-accent focus:border-none focus:outline-none focus:ring-2 focus:ring-specialColor"
                            onChange={(e)=>{
                                setConfirmPassword(e.target.value);
                            }}
                            value={confirmPassword}
                        />
                        <button className="w-1/2 p-3 bg-specialColor text-[#ffffff] text-xl rounded-lg " onClick={resetPassword}>
                            Reset Password
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}