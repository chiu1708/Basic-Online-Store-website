import { addCartItem } from './utils.js';

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