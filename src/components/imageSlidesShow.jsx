import { useState } from "react";

export default function ImageSlideShow(props){

    const [activeImage, setActiveImage] = useState(0);

    const images = props.images || []
    const productName = props.productName || ""

    return(
        <div className="w-[500px] h-[630px] flex flex-col my-8 shadow-2xl shadow-accent rounded-xl overflow-hidden">
            <img src={images[activeImage]} alt={productName} className="w-full aspect-square object-cover"/>
            <div className="w-full h-[100px] flex justify-center items-center gap-5 my-5">
                {
                    images.map(
                        (image , index)=>{
                           return(
                                <img 
                                    src={image} 
                                    key={index} 
                                    className={"w-[90px] object-covers hover:cursor-pointer rounded-lg " + (index == activeImage ? "border-2 border-accent shadow-2xl shadow-accent" : "")}
                                    onClick={()=>{
                                        setActiveImage(index);
                                    }}
                                />
                           );
                        }
                    )
                }
            </div>
        </div>
    )
}   