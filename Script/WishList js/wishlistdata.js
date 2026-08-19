export let wishListCart = JSON.parse(localStorage.getItem('wishListCart')) || [];

export function wishlistSaveItem(){
    localStorage.setItem("wishListCart", JSON.stringify(wishListCart));
}
