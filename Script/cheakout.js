import { Cart, addquantity, displayQuantity , updateCart , Clear , removeQuanity , plusQuanity} from "./Cart.js";
import { products } from "./product.js";


displayQuantity();
document.querySelector(".count-js").innerHTML = `${addquantity()} item in your cart`

let cartItemHtml = '';

Cart.forEach((cartItem) => {
    let productId = cartItem.ProductId;
    let matchingItem;
    products.forEach((item) => {
        if (item.id === productId) {
            matchingItem = item
        }
    })
    cartItemHtml += `
            <div class="selected-item id-${matchingItem.id}">
                <div class="img-box"><img src="${matchingItem.image}"></div>
                <div class="infomation">
                    <div class="item-decribe">
                        <div class="item-infomation">
                            <p>${matchingItem.name}</p>
                            <p>Rs.${matchingItem.priceCents} each</p>
                        </div>
                        <button class="trash-icon trash-js" data-product-id= "${matchingItem.id}"><i class="fa-regular fa-trash-can "></i></button>
                    </div>
                    <div class="quantity-price">
                        <div class="quantity">
                            <button class="minus-btn ${cartItem.quantity === 1 ? 'disabled' : ''}" data-product-id= "${matchingItem.id}"><i class="fa-solid fa-minus"></i></button>
                            <p class="Cart-id-${matchingItem.id}">${cartItem.quantity}</p>
                            <button class="plus-btn" data-product-id= "${matchingItem.id}"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <p class="price">Rs. ${matchingItem.priceCents}</p>
                    </div>
                </div>
            </div>
    `
    document.querySelector(".selected-item-container").innerHTML = cartItemHtml
})

let deleteBtn = document.querySelectorAll('.trash-js')
deleteBtn.forEach((button)=>{
    button.addEventListener(("click"),()=>{
        let itemID = button.dataset.productId;
       updateCart(itemID);
       
       document.querySelector(".count-js").innerHTML = `${addquantity()} item in your cart`;
       displayQuantity()
    })
})

let Clearbtn = document.querySelector(".Clear-btn");
Clearbtn.addEventListener("click",()=>{
    Clear();
    document.querySelector(".count-js").innerHTML = `${addquantity()} item in your cart`;
    displayQuantity()
})

let minusBtn = document.querySelectorAll('.minus-btn')
minusBtn.forEach((button)=>{
    button.addEventListener("click",()=>{
        let itemID = button.dataset.productId;
        removeQuanity(itemID)
        document.querySelector(".count-js").innerHTML = `${addquantity()} item in your cart`;
    displayQuantity()
    })
})
let plusBtn = document.querySelectorAll('.plus-btn')
plusBtn.forEach((button)=>{
    
    button.addEventListener("click",()=>{
        let itemID = button.dataset.productId;
        plusQuanity(itemID)
        document.querySelector(".count-js").innerHTML = `${addquantity()} item in your cart`;
    displayQuantity()
    })
})