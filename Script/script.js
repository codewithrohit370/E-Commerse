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

let index = 0;

setInterval(() => {
    document.querySelector(".hero-section").innerHTML = `
    <img src="${hero[index].img}" class="hero-img">
    <h3 class="hero-heading">${hero[index].heading}</h3>
    <p class="hero-para">${hero[index].para}</p>
  `;

    index++;
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

    if (index >= hero.length) {
        index = 0;
    }
}, 3000);


