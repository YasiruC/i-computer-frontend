import { Link } from "react-router-dom";

export default function NotFoundPage(){

    return(
        <div className="w-full h-[300px] flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
            <p className="text-sm text-secondary">The page you are looking for does not exist.</p>
            <Link to={"/"} className="px-4 py-2 bg-accent text-white rounded" >Back to Home</Link>
        </div>
    );
}