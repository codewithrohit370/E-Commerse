import { products } from "../product.js";
import { Cart, addquantity, displayQuantity , updateCart , Clear , removeQuanity , plusQuanity , renderTotalCartItem} from "../Cart.js";

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");


let html;
let matchingItem ;
products.forEach((product)=>{
    if(product.id === productId){
        matchingItem = product
    }
    if(matchingItem){
    html = `
         <div class="product-img-box">
            <img src="${matchingItem.image}" alt="Product Image">
        </div>

     
        <div class="product-details">

            <span class="badge">New Arrival</span>

            <h1>${matchingItem.name}</h1>

            <div class="price">
                <h2>₹${matchingItem.priceCents}</h2>
                <del>₹${matchingItem.priceCents + Math.round(matchingItem.priceCents * 33/100)}</del>
                <span class="discount">33% OFF</span>
            </div>

            <p class="description">
                Premium everyday sneakers designed with lightweight comfort and a
                clean modern look. Perfect for casual wear with long-lasting durability.
            </p>

            <div class="quantity">
                <h3>Quantity</h3>

                <div class="counter">
                    <button>-</button>
                    <span>1</span>
                    <button>+</button>
                </div>
            </div>

            <div class="features">

                <div>
                    <i class="fa-solid fa-truck-fast features-icon"></i>
                    <p>Free Shipping</p>
                </div>

                <div>
                    <i class="fa-solid fa-rotate-left features-icon"></i>
                    <p>Easy Return</p>
                </div>

                <div>
                    <i class="fa-solid fa-shield-halved features-icon"></i>
                    <p>Secure Payment</p>
                </div>

            </div>

            <button class="cartBtn">
                <i class="fa-solid fa-cart-shopping"></i>
                Add to Cart
            </button>

        </div>
    `
    }
    document.querySelector(".quick-view").innerHTML = html;
    gsap.from(".product-img-box", {
            opacity: 0,
            scale:0,
            x:-200,
            duration: 0.5,
        })

    gsap.from(".product-details",{
        opacity:0,
        scale:0,
        x:300,
        duration:0.5,
    })    

})
