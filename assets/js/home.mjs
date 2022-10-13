import { addCartItem } from './utils.js';
import { getData, API_URL } from './utils.js';

const products = await getData(`${API_URL}/product`);

const toProductList = () => {
    window.location.href = 'product-list.html';
}

document.querySelector('button.shop-now').addEventListener('click', toProductList);



addCartItem();







const ourFavImg = document.querySelector('#our-favorite .left img');

ourFavImg.addEventListener('mouseover', () => {
    // console.log(ourFavImg.getBoundingClientRect().top > 0 ? 'true' : 'false');
})



const banners = document.querySelectorAll('.banner-wrapper');
const bannerPrevs = document.querySelectorAll('#banner .prev');
const bannerNexts = document.querySelectorAll('#banner .next');


let current = 0;





const toNextBanner = () => {
    console.log(current);
    banners[current].classList.remove('active');
    current = current + 1 < 3 ? current + 1 : current -2;
    banners[current].classList.add('active');
}
const toPrevBanner = () => {
    banners[current].classList.remove('active');
    current = current - 1 > -1 ? current - 1 : current + 2;
    banners[current].classList.add('active');
}

bannerPrevs.forEach((prev, index) => {
    bannerNexts[index].addEventListener('click', toNextBanner);
    prev.addEventListener('click', toPrevBanner)
})

let i = 4000;
while(i < 800000) {
    setTimeout(() => {toNextBanner()}, i);
    i += 8000;
}

const feedbackContents = document.querySelectorAll('#feedbacks .content');
const feedbackBtns = document.querySelectorAll('#feedbacks .nav .move-to-other');
const lines = document.querySelectorAll('#feedbacks .nav .move-to-other .line');
let currentReview = 0;
feedbackBtns.forEach((feedback, index) => {
    feedback.addEventListener('click', () => {
        lines[currentReview].classList.remove('active');
        lines[index].classList.add('active');
        feedbackContents[currentReview].classList.remove('active');
        feedbackContents[index].classList.add('active');
        currentReview = index;
    })
})



const buildProductCard = (product) => {
    const cardTemplate = document.querySelector("#best-seller-product");
    const cardFragment = cardTemplate.content.cloneNode(true);
    const cardElement = cardFragment.querySelector(".product-card");
    
    const a = cardElement.querySelector("a");
    a.href=`product-detail.html?id=${product.id}`;

    const img = cardElement.querySelector("img");
    img.src = `assets/imgs/${product.imgList[0]}`;

    const name = cardElement.querySelector(".name");
    name.innerText = product.name;
    
    const categories = cardElement.querySelector(".categories");
    product.categoriesList.forEach((category, index) => {
        categories.innerHTML += `${index===0 ? "":", "}<a href="#">${category}<a>`;
    })

    const price = cardElement.querySelector(".price");
    price.innerText = `$${product.price}.00`;

    const addToCartIcon = cardElement.querySelector(".add-to-cart-icon");
    addToCartIcon.addEventListener("click", (e) => {
        e.preventDefault();
        addCartItem(product);
    })

    return cardElement;
}
const addProductCard = async (productsList=products, cardStart=0, cardEnd=productsList.length) => {
    const cardsContainer = document.querySelector("#best-seller .products");
    for (let i = cardStart; i < cardEnd; i++) {
        let cardElement = await buildProductCard(productsList[i]);
        cardsContainer.appendChild(cardElement);
    }
}

addProductCard(products,0,4);