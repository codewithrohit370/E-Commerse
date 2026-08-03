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
    if (!quantityElement) {
        return
    }
    if (addquantity() > 0) {
        quantityElement.style.display = "flex";
        quantityElement.textContent = addquantity();
        gsap.fromTo(
            ".add-quantity",
            { scale: 0 },
            {
                scale: 1,
                duration: 0.4,
                ease: "back.out(3)"
            }
        );

    } else {
        quantityElement.style.display = "none";
    }
}

export function renderTotalCartItem() {
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
    saveLocalStroge();
}

export function Clear() {
    Cart = [];
    saveLocalStroge();
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
    saveLocalStroge();
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
    saveLocalStroge();
}

export function saveLocalStroge() {
    localStorage.setItem("Cart", JSON.stringify(Cart));
}

export function showheaderOptionOnClick() {
    const searchBtn = document.querySelector(".search-btn")

    let isBtn = false;

    searchBtn.addEventListener('click', () => {
        if (!isBtn) {
            if (!document.querySelector(".btn-js")) {
                document.querySelector('header').insertAdjacentHTML("beforeend", `<div class="second-section-1">
                    <i class="fa-solid fa-magnifying-glass search-icon"></i>
                    <input type="text" placeholder="Search products..." class="search-input-1">
                </div>`);
                isBtn = true;
            } else {
                document.querySelector('.btn-js').insertAdjacentHTML("beforebegin", `<div class="second-section-1">
                    <i class="fa-solid fa-magnifying-glass search-icon"></i>
                    <input type="text" placeholder="Search products..." class="search-input-1">
                </div>`);
                isBtn = true;
            }
        } else {
            document.querySelector(".second-section-1").remove();
            isBtn = false
        }

    })

    let bar_Btn = false;
    const barBtn = document.querySelector(".bar-Btn")
    barBtn.addEventListener("click", () => {
        if (!bar_Btn) {
            document.querySelector('header').insertAdjacentHTML("beforeend", `<div class="btn-js">
                    <p>Contact</p>
                    <hr>
                   <div class="Btns-1">
                    <button>Sign In</button>
                    <button>Sign Up </button>
                </div>
                </div>`);
            bar_Btn = true;
        } else {
            document.querySelector(".btn-js").remove();
            bar_Btn = false;
        }
    })
}