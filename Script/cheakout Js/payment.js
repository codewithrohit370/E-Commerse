    import { Cart, addquantity, displayQuantity, updateCart, Clear, removeQuanity, plusQuanity } from "../Cart.js";
    import { products } from "../product.js";



let shippingCost = Number(localStorage.getItem("shippingCost")) || 0;
    export function renderpayment() {
        let totalAmount = 0;
        let renderpaymentHtml;
        Cart.forEach(element => {
            let matchingItem;
            products.forEach((item) => {
                if (item.id === element.ProductId) {
                    matchingItem = item
                }
            })
            totalAmount += matchingItem.priceCents * element.quantity

        });
        let taxAmount = Math.round((totalAmount + shippingCost)*0.1);
        let totalAmountAfterTax = totalAmount + taxAmount + shippingCost;

        renderpaymentHtml = `
                <p class="order-heading">Order Summary</p>
                <div class="items-info">
                    <p>Subtotal (${addquantity()} item) <span>Rs. ${totalAmount}</span></p>
                    <p>Shipping <span>${shippingCost === 0 ? "Free" : `Rs. ${shippingCost}`}</span></p>
                    <p>Tax <span>Rs. ${taxAmount}</span></p>
                </div>

                <div class="items-total">
                    <div class="total-section">
                        <p>Total</p>
                        <p>Rs. ${totalAmountAfterTax}</p>
                    </div>
                    <button class="proceed-btn"><i class="fa-regular fa-folder-closed"></i>Proceed to Cheakout</button>
                </div>


                <div class="shipping-options">
                    <h4>Shipping Option</h4>

                    <label class="shipping-option">
                        <div class="shipping-left">
                            <input type="radio" name="shipping" value="0" ${shippingCost === 0 ? "checked" : ""}>

                            <div class="shipping-details">
                                <span class="shipping-title">Free Shipping</span>
                                <span class="shipping-days">Delivery in 5-7 days</span>
                            </div>
                        </div>

                        <span class="shipping-price free-shipping">FREE</span>
                    </label>

                    <label class="shipping-option">
                        <div class="shipping-left">
                            <input type="radio" name="shipping" value="199" ${shippingCost === 199 ? "checked" : ""}>

                            <div class="shipping-details">
                                <span class="shipping-title">Express Shipping</span>
                                <span class="shipping-days">Delivery in 2-3 days</span>
                            </div>
                        </div>

                        <span class="shipping-price">Rs. 199</span>
                    </label>

                    <label class="shipping-option">
                        <div class="shipping-left">
                            <input type="radio" name="shipping" value="299"  ${shippingCost === 299 ? "checked" : ""}>

                            <div class="shipping-details">
                                <span class="shipping-title">Next Day Delivery</span>
                                <span class="shipping-days">Delivery Tomorrow</span>
                            </div>
                        </div>

                        <span class="shipping-price">Rs. 299</span>
                    </label>
                </div>

                <div class="extra-info">
                    <p><i class="fa-solid fa-shield info-icon-1"></i>Secure SSL cheakout</p>
                    <p><i class="fa-regular fa-truck info-icon-2"></i>Free return within 30 days</p>
                    <p><i class="fa-regular fa-heart info-icon-3"></i>24/7 customer support</p>
                </div>
        `

        document.querySelector(".order-container").innerHTML = renderpaymentHtml

        document.querySelectorAll('input[name="shipping"]').forEach((radio) => {
        radio.addEventListener("change", (event) => {
            shippingCost = Number(event.target.value);
            localStorage.setItem("shippingCost", shippingCost);
            renderpayment()
        })
    })
    }

