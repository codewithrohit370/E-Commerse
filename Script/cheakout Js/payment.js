import { Cart, addquantity, displayQuantity , updateCart , Clear , removeQuanity , plusQuanity} from "../Cart.js";
import { products } from "../product.js";




export function renderpayment(){
    let totalAmount = 0;
    let renderpaymentHtml;
    Cart.forEach(element => {
        let matchingItem;
        products.forEach((item)=>{
            if(item.id === element.ProductId){
                matchingItem = item
            }
        })
        totalAmount += matchingItem.priceCents * element.quantity

    });
    let taxAmount = Math.round(totalAmount*0.1);
    let totalAmountAfterTax = totalAmount + taxAmount;
    
    renderpaymentHtml = `
            <p class="order-heading">Order Summary</p>
            <div class="items-info">
                <p>Subtotal (${addquantity()} item) <span>Rs. ${totalAmount}</span></p>
                <p>Shipping <span>Free</span></p>
                <p>Tax <span>Rs. ${taxAmount}</span></p>
            </div>

            <div class="items-total">
                <div class="total-section">
                    <p>Total</p>
                    <p>Rs. ${totalAmountAfterTax}</p>
                </div>
                <button class="proceed-btn"><i class="fa-regular fa-folder-closed"></i>Proceed to Cheakout</button>
            </div>

            <div class="extra-info">
                <p><i class="fa-solid fa-shield info-icon-1"></i>Secure SSL cheakout</p>
                <p><i class="fa-regular fa-truck info-icon-2"></i>Free return within 30 days</p>
                <p><i class="fa-regular fa-heart info-icon-3"></i>24/7 customer support</p>
            </div>
    `

    document.querySelector(".order-container").innerHTML = renderpaymentHtml
}