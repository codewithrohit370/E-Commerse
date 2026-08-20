export let wishListCart = JSON.parse(localStorage.getItem('wishListCart')) || [];

export function wishlistSaveItem(){
    localStorage.setItem("wishListCart", JSON.stringify(wishListCart));
}

export function deleteWishListItem(itemId){
    let newArr = []
    wishListCart.forEach((item) => {
    if (itemId !== item.ProductId) {
       newArr.push(item)
      }
 })
     wishListCart = newArr;
     wishlistSaveItem();
}

export function clearWishCart(){
    wishListCart = [];
    wishlistSaveItem();
}

export function removeQuanityFromWishList(productId) {
    wishListCart.forEach((item) => {
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
    wishlistSaveItem();
}

export function plusQuanityFromWishList(productId) {
    wishListCart.forEach((item) => {
        if (productId === item.ProductId) {
            item.quantity++;
            document.querySelector(`.Cart-id-${productId}`).innerHTML = item.quantity;
        }
        const minusBtn = document.querySelector(
            `.minus-btn[data-product-id="${productId}"]`
        );

        minusBtn.classList.remove("disabled");

    })
    wishlistSaveItem();
}

export function addquantityfromWishlist() {
    let Totalcount = 0
    wishListCart.forEach((item) => {
        Totalcount += item.quantity;
    })
    return Totalcount;
}

export function displayQuantityWishlistItem() {
    const quantityElement = document.querySelector(".Wishlist-quantity");
    if (!quantityElement) {
        return
    }
    if (addquantityfromWishlist() > 0) {
        quantityElement.style.display = "flex";
        quantityElement.textContent = addquantityfromWishlist();
        gsap.fromTo(
            ".Wishlist-quantity",
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