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