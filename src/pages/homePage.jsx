import { useState } from "react";
import Header from "../components/header";
import uploadMedia from "../utils/mediaUpload";
import toast from "react-hot-toast";

export default function HomePage(){
    const [file , setFile] = useState();

    async function handleFile(){
        try{
            const mediaUrl = await uploadMedia(file);

            console.log("Media Successful🎊 " + mediaUrl );
            toast.success("Media Successful🎊 ");
        }catch(error){
            toast.error(error);
        }
    }

    return (
        <div className = "">
            <Header/>
            <h1>Yasiru Chathuranga</h1>
            <input type="file" onChange={
                (e)=>{
                    setFile(e.target.files[0]);
                }
            }/>

            <button onClick={ handleFile } className="bg-amber-200">Upload</button>
        </div>
    )
}