import { useEffect } from "react";
import api from "../utils/api";
import { useState } from "react";
import uploadMedia from "../utils/mediaUpload";
import toast from "react-hot-toast";
import LoadingAnimation from "../components/loadingAnimation";

export default function UserProfilePage(){
    const [user ,setUser] = useState(null);
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [imageFile,setImageFile] = useState(null);
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            window.location.href = "/login";
        }else{
            //fetch user details using token
            api.get("/users/profile",{
                headers : { Authorization : `Bearer ${token}` }
            }).then((response)=>{
                setUser(response.data);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
            }).catch((error)=>{
                console.error("Error fetching user details:", error);
                window.location.href = "/login";
            });
        }
    }, []);
    const [currentPassword,setCurrentPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    async function handleUpdateProfile(){
        setIsUpdatingProfile(true);
        const token = localStorage.getItem("token");
        if(!token){
            window.location.href = "/login";
            return;
        }

        try{
            const data = { 
                firstName : firstName,
                lastName : lastName,
                image : user.image
            };

            if(imageFile){
                const imageUrl = await uploadMedia(imageFile);
                data.image = imageUrl;
            }

            const response = await api.put("/users/",data,{
                headers : { Authorization : `Bearer ${token}` }
            });

            localStorage.setItem("token", response.data.token);

            toast.success("Profile updated successfully");
            window.location.reload();
        }catch(error){
            console.error("Error updating profile:", error);
            toast.error("Error updating profile");
            return;
        }
        setIsUpdatingProfile(false);
    }

    async function handleUpdatePassword(){
        setIsUpdatingPassword(true);
        const token = localStorage.getItem("token");
        if(!token){
            window.location.href = "/login";
            return;
        }

        try{
            const data = { 
                currentPassword : currentPassword,
                newPassword : newPassword,
                confirmPassword : confirmPassword
            };

            await api.put("/users/password",data,{
                headers : { Authorization : `Bearer ${token}` }
            });
            toast.success("Password updated successfully. Please login again.");
            localStorage.removeItem("token");
            window.location.href = "/login";
        }catch(error){
            toast.error(error?.response?.data?.message);
            return;
        }
        setIsUpdatingPassword(false);
    }


    return(
        <div className="w-full h-full flex items-center justify-center gap-6">
            {
                user ?
                <>
                    <div className="w-[500px] bg-white p-4 rounded-lg shadow-md ">
                        <h2 className="text-4xl font-semibold mb-4 text-center text-accent">Update Profile</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>  
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="file"
                                placeholder="Image"
                                onChange={(e) => setImageFile(e.target.files[0])}
                            />
                        </div>
                        <div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleUpdateProfile} disabled={isUpdatingProfile}>
                                {isUpdatingProfile ? "Updating..." : "Update Profile"}
                            </button>
                        </div>
                    </div>
                    {/* //update password form */}
                    <div className="w-[500px] bg-white p-4 rounded-lg shadow-md ">
                        <h2 className="text-4xl font-semibold mb-4 text-center text-accent">Update Password</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Current Password</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="password"
                                placeholder="Current Password"
                                onChange={(e)=>{ setCurrentPassword(e.target.value)}}
                            />
                        </div> 
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="password"
                                placeholder="New Password"
                                onChange={(e)=>{ setNewPassword(e.target.value)}}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="password"
                                placeholder="Confirm Password"
                                onChange={(e)=>{ setConfirmPassword(e.target.value)}}
                            />
                        </div> 
                        <div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleUpdatePassword} disabled={isUpdatingPassword}>
                                {isUpdatingPassword ? "Updating..." : "Update Password"}
                            </button>
                        </div>
                    </div>
                </>
                :
                <LoadingAnimation />
            }
        </div>
    );
}