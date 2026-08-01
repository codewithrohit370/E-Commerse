import { products } from "../product.js";
import { Cart, addquantity, displayQuantity, updateCart, Clear, removeQuanity, plusQuanity, renderTotalCartItem , saveLocalStroge } from "../Cart.js";

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");
let selectedQuanity = 1
let html;
let matchingItem;
let cartMatchingItem;
displayQuantity();
Cart.forEach((item)=>{
    if(item.ProductId === productId){
        cartMatchingItem = item;
        selectedQuanity = item.quantity;
    }
})
products.forEach((product) => {
    if (product.id === productId) {
        matchingItem = product
    }
    if (matchingItem) {
        html = `
         <div class="product-img-box">
            <img src="${matchingItem.image}" alt="Product Image">
        </div>

     
        <div class="product-details">

            <span class="badge">New Arrival</span>

            <h1>${matchingItem.name}</h1>

            <div class="price">
                <h2>₹${matchingItem.priceCents}</h2>
                <del>₹${matchingItem.priceCents + Math.round(matchingItem.priceCents * 33 / 100)}</del>
                <span class="discount">33% OFF</span>
            </div>

            <p class="description">
                Premium everyday sneakers designed with lightweight comfort and a
                clean modern look. Perfect for casual wear with long-lasting durability.
            </p>

            <div class="quantity">
                <h3>Quantity</h3>

                <div class="counter">
                    <button class="minus-btn" ${selectedQuanity === 1 ? `disabled` : ``}>-</button>
                    <span class="display-quantity">${(cartMatchingItem)? cartMatchingItem.quantity: '1'}</span>
                    <button class="plus-btn">+</button>
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
        scale: 0,
        x: -200,
        duration: 0.5,
    })

    gsap.from(".product-details", {
        opacity: 0,
        scale: 0,
        x: 300,
        duration: 0.5,
    })

})

let plusBtn = document.querySelector(".plus-btn");
plusBtn.addEventListener('click', () => {
    selectedQuanity++;
    minusBtn.disabled = false;

    document.querySelector(".display-quantity").innerHTML = selectedQuanity;
})

let minusBtn = document.querySelector(".minus-btn");
minusBtn.addEventListener('click', () => {
    if (selectedQuanity > 1) {
    selectedQuanity--;
    }
    if (selectedQuanity === 1) {
        minusBtn.disabled = true;
    } else {
        minusBtn.disabled = false;
    }   
    
    document.querySelector(".display-quantity").innerHTML = selectedQuanity;
})

let addBtn = document.querySelector(".cartBtn")
let addTime;
let resetTime;
addBtn.addEventListener('click', () => {

        addBtn.style.opacity = 0.5;
        addBtn.innerHTML = `<div class="loader"></div> Adding...`;
        clearTimeout(addTime)
        clearTimeout(resetTime)

        addTime = setTimeout(() => {
            addBtn.style.opacity = 1;
            addBtn.style.backgroundColor = "#07d600";
            addBtn.innerHTML = `<i class="fa-solid fa-check"></i> &nbsp;Added to Cart`;

            gsap.fromTo(addBtn,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                }
            );

        }, 1000);

        resetTime = setTimeout(() => {
            addBtn.style.backgroundColor = "";
            addBtn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Add to Cart`;

            gsap.fromTo(addBtn,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                }
            );

        }, 2000);
    
    let matchingId;
    Cart.forEach((itme) => {
        if (itme.ProductId === productId) {
            matchingId = itme
        }
    })
    if (matchingId) {
        matchingId.quantity = selectedQuanity;
    } else {
        Cart.push({
            ProductId: productId,
            quantity: selectedQuanity
        });
    }
    document.querySelector('.display-quantity').innerHTML = selectedQuanity;
    saveLocalStroge();
    displayQuantity();
})
