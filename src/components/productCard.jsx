import { Link } from "react-router-dom";
import priceFormat from "../utils/priceFormat";

export default function ProductCard(props){

    const product = props.product;

    return(
        <Link to={"/overview/" + product.productId} className={"w-[300px] h-[450px] m-5 bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col justify-between " + ( product.images.length > 1 && "hover:[&_.first-image]:opacity-0")}  >
            <div className="w-[300px] h-[300px] relative shrink-0">
                <img src={product.images[1]} alt={product.name} className="w-[300px] h-[300px] object-cover absolute top-0 left-0"/>
                <img src={product.images[0]} alt={product.name} className="first-image w-[300px] h-[300px] object-cover absolute top-0 left-0 transition-opacity duration-400"/>
            </div>
            <h1 className="text-lg font-semibold mt-2 px-2">{product.name}</h1>
            <div className="w-full flex flex-col py-4">
                {
                    product.labelPrice > product.price && <span className="text-sm text-secondary mt-2 px-4 line-through">{priceFormat(product.labelPrice) }</span>
                }
                <span className="text-lg font-bold mt-1 px-4 text-black">{priceFormat(product.price)}</span>
            </div>
        </Link>
    );
}