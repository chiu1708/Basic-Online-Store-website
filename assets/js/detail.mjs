import { getData, API_URL, buildReview, buildProductCard } from "./utils.js"
import { addCartItem, addFavItem } from "./utils.js";

const chooseStar = document.querySelector('.your-review .stars-container');
const whiteStars = chooseStar.querySelectorAll('.white');
const blackStars = chooseStar.querySelectorAll('.black');

function clickStarEvent(black, number) {
    if (black) {
        for (var i = number; i < 5; i++) {
            blackStars[i].classList.remove('active');
            whiteStars[i].classList.add('active');
        }
        return;
    }
    for (var i = 0; i < number; i++) {
        whiteStars[i].classList.remove('active');
        blackStars[i].classList.add('active');
    }
}

whiteStars.forEach((star, index) => {
    star.addEventListener('click', () => {
        clickStarEvent(false ,index+1);
    })
    blackStars[index].addEventListener('click', () => {
        clickStarEvent(true ,index+1);
    })
})

const buildCustomerReview = (customerReview) => {
    const reviewTemplate = document.querySelector('#review');
    const reviewFragment = reviewTemplate.content.cloneNode(true);
    const reviewElement = reviewFragment.querySelector('.review-container');

    const img = reviewElement.querySelector('img');
    img.src = `assets/imgs/home-feedback-user1.jpg`;
    buildCustomerReviewStar(reviewElement, customerReview.star);

    const name = reviewElement.querySelector('.name');
    name.innerText = customerReview.userName;

    const day = reviewElement.querySelector('.day');
    const month = reviewElement.querySelector('.month');
    const year = reviewElement.querySelector('.year');
    day.innerText = customerReview.time.day;
    month.innerText = customerReview.time.month;
    year.innerText = customerReview.time.year;

    const description = reviewElement.querySelector('.description');
    description.innerText = customerReview.content;

    return reviewElement;
}

const buildCustomerReviewStar = (element, reviewStarNumber) => {
    const blackStars = element.querySelectorAll("i.black");
    const whiteStars = element.querySelectorAll("i.white");
    for (let i = 0; i < reviewStarNumber; i++) {
        whiteStars[i].classList.remove("active");
        blackStars[i].classList.add("active");
    }
}

const products = await getData(`${API_URL}/product`);
const addRelateProduct = () => {
    const cardsContainer = document.querySelector("#relate-products .cards-container");
    for (let i = 0; i < 4; i++) {
        let cardElement = buildProductCard(products[i]);
        cardsContainer.appendChild(cardElement);
    }
}

const buildProductDetail = async () => {
    const search = window.location.search;
    const param = new URLSearchParams(search);
    const id = param.get('id');
    const data = await getData(`${API_URL}/product/${id}`);
    console.log(data);

    const topProductImgs = document.querySelectorAll('.top-product-info .product-img img');
    topProductImgs.forEach((img) => {
        img.src = `assets/imgs/${data.imgList[0]}`
    })

    const name = document.querySelector('.name');
    name.innerText = data.name;

    const price = document.querySelector('.price');
    price.innerText = `$${data.price}.00`;

    const review = document.querySelector('.review-container');
    buildReview(data, review);
    const reviewNumber = review.querySelector('.customer-number');
    reviewNumber.innerText = `(${data.reviewList.length} customer review)`;

    const introduce = document.querySelector('.introduce');
    introduce.innerText = data.title;

    const sku = document.querySelector('.sku');
    sku.innerText = `sku: ${data.sku}`;

    const categories = document.querySelector('.categories');
    categories.innerText = `categories: ${data.categoriesList}`;

    const tags = document.querySelector('.tags');
    tags.innerText = `tags: ${data.tagsList}`;

    const description = document.querySelector('.description .content');
    description.innerText = `description: ${data.description}`;

    const height = document.querySelector('.weight');
    height.innerText = data.weight;

    const dimensions = document.querySelector('.dimensions');
    dimensions.innerText = data.dimensions;

    const bottomReviewNumber = document.querySelector('.bottom-product-info .review-number');
    bottomReviewNumber.innerText = `${data.reviewList.length} review for ${data.name}`;

    const addToCartInput = document.querySelector('.add-to-cart-container .number-input-container input');
    const addToCartBtn = document.querySelector('.add-to-cart-container .button-container button');
    addToCartBtn.addEventListener('click', () => {
        addCartItem(data, Number(addToCartInput.value));
    })
    const addToCartBtns = document.querySelectorAll('.add-to-cart-container .number-input-container button');
    const addProductQuantity = (add) => {
        if (Number(addToCartInput.value) + add > 0) {
            addToCartInput.value = Number(addToCartInput.value) + add;
        }
    }
    addToCartBtns[1].addEventListener('click', () => addProductQuantity(1));
    addToCartBtns[0].addEventListener('click', () => addProductQuantity(-1));

    const addToFav = document.querySelector('.add-to-wish-list-container');
    addToFav.addEventListener('click', () => addFavItem(data));

    const customerReviewContainer = document.querySelector('.bottom-info.reviews .reviews-container');
    data.reviewList.forEach((review) => {
        customerReviewContainer.appendChild(buildCustomerReview(review));
    })

    addRelateProduct();
}

const infoNavLis = document.querySelectorAll('.info-nav ul li');
const setActiveProductInfo = (activeTarget) => {
    const bottomInfos = document.querySelectorAll('.bottom-info');
    bottomInfos.forEach((bottomInfo, index) => {
        bottomInfo.classList.remove('active');
        infoNavLis[index].classList.remove('active');
    })
    bottomInfos[activeTarget].classList.add('active');
    infoNavLis[activeTarget].classList.add('active');
}

infoNavLis.forEach((infoNavLi, index) => {
    infoNavLi.addEventListener('click', () => {
        setActiveProductInfo(index);
    });
})

buildProductDetail();