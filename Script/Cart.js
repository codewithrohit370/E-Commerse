export let Cart = JSON.parse(localStorage.getItem('Cart')) || [];

export function addquantity() {
    let Totalcount = 0
    Cart.forEach((item) => {
        Totalcount += item.quantity;
    })
    return Totalcount;
}

export function displayQuantity() {
    const quantityElement = document.querySelector(".add-quantity");
    if (addquantity() > 0) {
        quantityElement.style.display = "flex";
        quantityElement.textContent = addquantity();
        gsap.from(".add-quantity", {
                scale: 0,
                duration: .4,
                ease: "back.out(3)"
            });
        
    } else {
        quantityElement.style.display = "none";
    }
}

export function renderTotalCartItem(){
    document.querySelector(".count-js").innerHTML = `${addquantity()} item in your cart`;

}

export function updateCart(productId) {
    let newArr = []
    Cart.forEach((item) => {
        if (productId !== item.ProductId) {
            newArr.push(item)
        }
    })
    Cart = newArr;
    localStorage.setItem("Cart", JSON.stringify(Cart))
}

export function Clear() {
    Cart = [];
    localStorage.setItem("Cart", JSON.stringify(Cart))
}

export function removeQuanity(productId) {
    Cart.forEach((item) => {
        if (productId === item.ProductId) {
            if (item.quantity > 1) {
                item.quantity--;
            }
            document.querySelector(`.Cart-id-${productId}`).innerHTML = item.quantity;

            const minusBtn = document.querySelector(
                `.minus-btn[data-product-id="${productId}"]`
            );

            if (item.quantity === 1) {
                minusBtn.classList.add("disabled");
            } else {
                minusBtn.classList.remove("disabled");
            }
        }

    })
    localStorage.setItem("Cart", JSON.stringify(Cart));
}
export function plusQuanity(productId) {
    Cart.forEach((item) => {
        if (productId === item.ProductId) {
            item.quantity++;
            document.querySelector(`.Cart-id-${productId}`).innerHTML = item.quantity;
        }
        const minusBtn = document.querySelector(
            `.minus-btn[data-product-id="${productId}"]`
        );

        minusBtn.classList.remove("disabled");

    })
    localStorage.setItem("Cart", JSON.stringify(Cart));
}