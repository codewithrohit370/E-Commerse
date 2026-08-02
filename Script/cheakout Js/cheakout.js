import { Cart, addquantity, displayQuantity, updateCart, Clear, removeQuanity, plusQuanity, renderTotalCartItem } from "../Cart.js";
import { products } from "../product.js";
import { renderpayment } from "./payment.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
import { delveryOption } from "../delivery-option.js";


export function renderHtml() {
    renderpayment();
    displayQuantity();
    renderTotalCartItem();   

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
                <div class="img-box" data-product-id="${matchingItem.id}"><img src="${matchingItem.image}"></div>
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
                        <p class="price">Rs. ${(matchingItem.priceCents * cartItem.quantity)}</p>
                    </div>
                </div>
            </div>
    `
    })
    document.querySelector(".selected-item-container").innerHTML = cartItemHtml

    const cartItems = document.querySelectorAll(".selected-item");

    cartItems.forEach((item) => {
        const imgBox = item.querySelector(".img-box");
        const img = imgBox.querySelector("img");
        const productId = imgBox.dataset.productId;

        imgBox.addEventListener("mouseenter", () => {

            imgBox.insertAdjacentHTML(
                "beforeend",
                `
            <div class="hover-effect">
                <a href="quickView.html?id=${productId}">
                    <button class="view-btn">
                        <i class="fa-regular fa-eye"></i>
                    </button>
                </a>
            </div>
            `
            );

            gsap.to(img, {
                scale: 1,
                duration: 0.3
            });

            gsap.to(item, {
                y: -5,
                scale: 1,
                duration: 0.3
            });

            gsap.from(imgBox.querySelector(".hover-effect"), {
                opacity: 0,
                duration: 0.3
            });

        });

        imgBox.addEventListener("mouseleave", () => {

            const hoverEffect = imgBox.querySelector(".hover-effect");

            if (hoverEffect) {
                hoverEffect.remove();
            }

            gsap.to(img, {
                scale: 1,
                duration: 0.3
            });

            gsap.to(item, {
                y: 0,
                scale: 1,
                duration: 0.3
            });

        });
    });



    let deleteBtn = document.querySelectorAll('.trash-js')
    deleteBtn.forEach((button) => {
        button.addEventListener(("click"), () => {
            let itemID = button.dataset.productId;
            updateCart(itemID);
            renderHtml();
            renderTotalCartItem();
            displayQuantity()
        })
    })

    let Clearbtn = document.querySelector(".Clear-btn");
    Clearbtn.addEventListener("click", () => {
        Clear();
        renderHtml();
        renderTotalCartItem();
        displayQuantity()
    })

    let minusBtn = document.querySelectorAll('.minus-btn')
    minusBtn.forEach((button) => {
        button.addEventListener("click", () => {
            let itemID = button.dataset.productId;
            removeQuanity(itemID)
            renderHtml();
            renderpayment();
            renderTotalCartItem();
            displayQuantity()
        })
    })
    let plusBtn = document.querySelectorAll('.plus-btn')
    plusBtn.forEach((button) => {

        button.addEventListener("click", () => {
            let itemID = button.dataset.productId;
            plusQuanity(itemID)
            renderHtml();
            renderpayment();
            renderTotalCartItem();
            displayQuantity()
        })
    })

}
renderHtml();
