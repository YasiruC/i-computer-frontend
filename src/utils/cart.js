export function getCart(){
    const cartString = localStorage.getItem("cart");

    if(cartString == null){
        localStorage.setItem("cart","[]");
        return [];
    }else{
        const cart = JSON.parse(cartString);
        return cart;
    }
}

export function addToCart(product, quantity){
    const cart = getCart();

    const existingProductIndex = cart.findIndex( //findIndex is array function
        (cartItem)=>{
            return cartItem.product.productId == product.productId
        }
    );


    if(existingProductIndex == -1){
        if(quantity > 0){
            cart.push({
                product : {
                    productId : product.productId,
                    name : product.name,
                    image : product.images[0],
                    labelPrice : product.labelPrice,
                    price : product.price
                },
                quantity : quantity
            });
        }
    }else{
        const newQty = cart[existingProductIndex].quantity + quantity;

        if(newQty > 0){
            cart[existingProductIndex].quantity =newQty;
        }else{
            cart.splice(existingProductIndex, 1);
        }
    }

    const cartString = JSON.stringify(cart);

    localStorage.setItem("cart", cartString);
}

export function getCartTotal(cart){
    let total = 0;

    for(let i = 0; i < cart.length; i++){
        total += (cart[i].product.price * cart[i].quantity);
    }

    return total;
}