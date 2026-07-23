import { products } from "./product.js";
import { Cart , addquantity , displayQuantity } from "./Cart.js";

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

let hero = [{
    img: "images/hero-images.jpg",
    heading: "Step Into Style",
    para: "Step into comfort with premium sneakers crafted for every move."
},
{
    img: "images/hero-images-2.jpg",
    heading: "Own Every step",
    para: "Walk with confidence in sneakers that blend style and comfort."
},

{
    img: "images/hero-images-3.jpg",
    heading: "Move in Style",
    para: "Discover sneakers made to elevate your everyday style."
}
]

function addbanner() {
    index++;
    if (index >= hero.length) {
        index = 0;
    }
    renderBanner();

    gsap.from(".hero-img", {
        opacity: 0,
        x: 30,
        duration: 0.8
    });

    gsap.from(".hero-heading", {
        opacity: 0,
        x: 30,
        duration: 0.8,
        delay: 0.2
    });

    gsap.from(".hero-para", {
        opacity: 0,
        x: 30,
        duration: 0.8,
        delay: 0.4
    });
}

let index = 0;
const forwardbtn = document.querySelector('.forward-btn');

forwardbtn.addEventListener('click', () => {
    addbanner();
})

const backwordBtn = document.querySelector('.backword-btn');
backwordBtn.addEventListener('click', () => {
    removebanner();
})


function removebanner() {
    index--;
    if (index < 0) {
        index = 2;
    }
    renderBanner();

    gsap.from(".hero-img", {
        opacity: 0,
        x: -30,
        duration: 0.8
    });

    gsap.from(".hero-heading", {
        opacity: 0,
        x: -30,
        duration: 0.8,
        delay: 0.2
    });

    gsap.from(".hero-para", {
        opacity: 0,
        x: -30,
        duration: 0.8,
        delay: 0.4
    });
}

function renderBanner() {
    document.querySelector(".hero-section").innerHTML = `
    <img src="${hero[index].img}" class="hero-img">
    <h3 class="hero-heading">${hero[index].heading}</h3>
    <p class="hero-para">${hero[index].para}</p>
    <div class="btns">
            <button class="backword-btn"><</button>
            <button class="forward-btn">></button>
        </div>
  `
    const backwordBtn = document.querySelector(".backword-btn");

    backwordBtn.addEventListener("click", () => {
        removebanner();
    })

    const newBtn = document.querySelector(".forward-btn");

    newBtn.addEventListener("click", () => {
        addbanner();
    })

}


// Create Html for add product
let Html = '';
products.forEach((product, index) => {
    Html += `<div class="product">
            <div class="product-images-box">
                <img src="${product.image}" >
            </div>
            <div class="product-info">
                <p>${product.name}</p>
                <p>Rs.${product.priceCents}</p>
                <button class="Add-btn" data-product-id="${product.id}">Add to Cart</button>
            </div>
        </div>`
    document.querySelector(".product-section").innerHTML = Html;
})

// Hover Effect in Product
let hoverHtml = '';
const hoverProduct = document.querySelectorAll(".product");
hoverProduct.forEach((hover) => {
    let hoverImage = hover.querySelector(".product-images-box");
    const img = hoverImage.querySelector("img");
    hoverImage.addEventListener("mouseenter", () => {
        hoverHtml = `<div class="hover-effect">
        <button class="view-btn"><i class="fa-regular fa-eye"></i> Quick View</button>
        <i class="fa-regular fa-heart heart-icon"></i>
        </div>`
        hoverImage.insertAdjacentHTML("beforeend", hoverHtml);
        gsap.to(img, {
            scale: 1.1,
            duration: 0.3
        });

        gsap.to(hover, {
            y: -5,
            scale: 1.02,
            duration: 0.3,
        })
        gsap.from(".hover-effect", {
            opacity: 0,
            duration: 0.3,
        })

    })
    hoverImage.addEventListener("mouseleave", () => {
        document.querySelector(".hover-effect").remove();
        gsap.to(img, {
            scale: 1,
            duration: 0.3
        });

        gsap.to(hover, {
            y: 0,
            scale: 1,
            duration: 0.3,
        })
        gsap.to(".hover-effect", {
            opacity: 0,
            duration: 0.3,
        })
    })
})



displayQuantity()
let AddBtn = document.querySelectorAll(".Add-btn");
let count = 1;
AddBtn.forEach((Button) => {
    Button.addEventListener("click", () => {
        Button.style.opacity = 0.5;
        Button.innerHTML = `<div class="loader"></div> Adding...`;

        setTimeout(() => {
            Button.style.opacity = 1;
            Button.style.backgroundColor = "#07d600";
            Button.innerHTML = `<i class="fa-solid fa-check"></i> &nbsp;Added to Cart`;

            gsap.fromTo(Button,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                }
            );
        }, 1000);

        setTimeout(() => {
            Button.style.backgroundColor = "";
            Button.innerHTML = "Add to Cart";

            gsap.fromTo(Button,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                }
            );
        }, 2000);


        let itemID = Button.dataset.productId;
        let matchingId;
        Cart.forEach((itme) => {
            if (itme.ProductId === itemID) {
                matchingId = itme
            }
        })

        if (matchingId) {
            count = Number(matchingId.quantity += 1);
        } else {
            Cart.push({
                ProductId: itemID,
                quantity: count,
            })
        }
        localStorage.setItem("Cart", JSON.stringify(Cart));
        count = 1
        
        displayQuantity()

    })
})