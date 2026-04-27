export default function ProductCard(props){
    return(
        <div>
            <h2>{props.name}</h2>
            <img src={props.image} alt={"picture of a " + props.name} />
            <p>LKR {props.price}/-</p>
            <button>Buy Now</button>
        </div>
    );
}