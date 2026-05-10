import { useEffect, useState } from "react";
import toast from"react-hot-toast";
import uploadMedia from "../../utils/mediaUpload";
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminUpdateProductPage(){
    const location = useLocation();
    const [productId , setProductId] = useState(location.state?.productId || "");
    const [name , setName] = useState(location.state?.name || "");
    const [altNames , setAltNames] = useState(location.state?.altNames ? location.state.altNames.join(",") : "");
    const [price , setPrice] = useState(location.state?.name || "");
    const [labelledPrice , setLabelledPrice] = useState(location.state?.price || "");
    const [category , setCategory] = useState(location.state?.category || "");
    const [images , setImages] = useState(location.state?.images || []);
    const [description , setDescription] = useState(location.state?.description || "");
    const [brand , setBrand] = useState(location.state?.brand || "");
    const [model , setModel] = useState(location.state?.model || "");
    const [stock , setStock] = useState(location.state?.stock || 0);
    const [isAvailable , setIsAvailable] = useState(location.state?.isAvailable || false);

    const navigate = useNavigate();

    useEffect(
        ()=>{
            if(location.state == null){
                toast.error("No product data found.Please select a product to edit");
                navigate("/admin/products");
            }
        },
        []
    );

    async function handleSave(){
        try{
            const token = localStorage.getItem("token");
            if(token == null){
                toast.error("You must be logged in to perform this action.");
                window.location.href = "/login";
                return;
            }

            const mediaUrls = [];
            for(let i = 0; i < images.length; i++){
                mediaUrls.push(uploadMedia(images[i]));
            }

            const urls = await Promise.all(mediaUrls)
            const altNamesArray = altNames.split(",");

            const productData = {
                productId : productId,
                name : name,
                altNames : altNamesArray,
                price : price,
                labelPrice : labelledPrice,
                description : description,
                images : urls,
                brand : brand,
                model : model,
                category : category,
                isAvailble : isAvailable,
                stock : stock
            }

            await axios.post(import.meta.env.VITE_API_URL + "/products", productData ,{
                headers : {
                    "Authorization" : "Bearer " + token
                }
            });

            toast.success("Product added successfully.");
            navigate("/admin/products");


        }catch(error){
            toast.error(error?.response?.data?.message || "Failed to add product. Please try again.");
        }
    }

    return(
        <div className="w-full h-full p-3 flex flex-col items-center rounded-2xl overflow-y-scroll">
            <div className="sticky top-0 w-full h-[100px] shadow-2xl bg-accent text-[#ffffff] font-semibold flex items-center justify-between p-5 rounded-lg">
                <h1 className="text-2xl ">Update Product</h1>
                <div className="h-full flex items-center justify-center">
                    <button onClick={handleSave} className="ml-4 px-4 py-2 bg-specialColor rounded-lg hover:bg-amber-300">Save</button>
                    <button className="ml-4 px-4 py-2 bg-specialColor rounded-lg hover:bg-amber-300">Cancel</button>
                </div>
            </div>

            <div className="w-full bg-white shadow-2xl p-5 mt-8 rounded-lg flex flex-wrap">

                <div className="w-1/4 p-2">
                    <label className="block font-semibold">Product ID</label>
                    <input type="text" className="border border-gray-300 rounded-md p-2 w-full"
                        value={productId}
                        onChange={(e)=>{setProductId(e.target.value)}}
                    />
                </div>

                <div className="w-3/4 p-2">
                    <label className="block font-semibold">Name</label>
                    <input type="text" className="border border-gray-300 rounded-md p-2 w-full"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                    />
                </div>

                <div className="w-full p-2">
                    <label className="block font-semibold">Alternative Names (comma separated)</label>
                    <input type="text" className="border border-gray-300 rounded-md p-2 w-full"
                        value={altNames}
                        onChange={(e)=>{setAltNames(e.target.value)}}
                    />
                </div>

                <div className="w-1/4 p-2">
                    <label className="block font-semibold">Price</label>
                    <input type="text" className="border border-gray-300 rounded-md p-2 w-full"
                        value={price}
                        onChange={(e)=>{setPrice(e.target.value)}}
                    />
                </div>

                <div className="w-1/4 p-2">
                    <label className="block font-semibold">Label Price</label>
                    <input type="text" className="border border-gray-300 rounded-md p-2 w-full"
                        value={labelledPrice}
                        onChange={(e)=>{setLabelledPrice(e.target.value)}}
                    />
                </div>

                <div className="w-1/4 p-2">
                    <label className="block font-semibold">Category</label>
                    <select className="border border-gray-300 rounded-md p-2 w-full"
                        value={category}
                        onChange={(e)=>{setCategory(e.target.value)}}
                    >
                        <option value="Laptop">Laptop</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Headphones">Headphones</option>
                        <option value="Camera">Camera</option>
                        <option value="VGA">VGA</option>
                    </select>
                </div>

                <div className="w-1/4 p-2">
                    <label className="block font-semibold">Images</label>
                    <input type="file" multiple className="border border-gray-300 rounded-md p-2 w-full"
                        onChange={(e)=>{setImages(e.target.files)}}
                    />
                </div>

                <div className="w-full p-2">
                    <label className="block font-semibold">Description</label>
                    <textarea className="border border-gray-300 rounded-md p-2 w-full"
                        value={description}
                        onChange={(e)=>{setDescription(e.target.value)}}
                    />
                </div>

                <div className="w-1/4 p-2">
                    <label className="block font-semibold">Brand</label>
                    <select className="border border-gray-300 rounded-md p-2 w-full"
                        value={brand}
                        onChange={(e)=>{setBrand(e.target.value)}}
                    >
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="MSI">MSI</option>
                        <option value="Dell">Dell</option>
                    </select>
                </div>

                <div className="w-1/4 p-2">
                    <label className="block font-semibold">Model</label>
                    <input type="text" className="border border-gray-300 rounded-md p-2 w-full"
                        value={model}
                        onChange={(e)=>{setModel(e.target.value)}}
                    />
                </div>

                <div className="w-1/4 p-2">
                    <label className="block font-semibold">Stock</label>
                    <input type="text" className="border border-gray-300 rounded-md p-2 w-full"
                        value={stock}
                        onChange={(e)=>{setStock(e.target.value)}}
                    />
                </div>

                <div className="w-1/4 p-2">
                    <label className="block font-semibold">Availability</label>
                    <select className="border border-gray-300 rounded-md p-2 w-full"
                        value={isAvailable}
                        onChange={(e)=>{setIsAvailable(e.target.value === "true" )}}
                    >
                        <option value={true}>Available</option>
                        <option value={false}>Not Available</option>
                    </select>
                </div>

            </div>
        </div>
    );
}