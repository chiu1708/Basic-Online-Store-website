// cart


let cartItemList = JSON.parse(localStorage.getItem('cartItemList')) ? JSON.parse(localStorage.getItem('cartItemList')) : [];
let favItemList = JSON.parse(localStorage.getItem('favItemList')) ? JSON.parse(localStorage.getItem('favItemList')) : [];
console.log(cartItemList);



const buildCartItems = (product, quantity=1) => {
    const itemTemplate = document.querySelector('#cartItem');
    const itemFragment = itemTemplate.content.cloneNode(true);
    const itemElement = itemFragment.querySelector('.item-container');
    
    const img = itemElement.querySelector('img');
    img.src = `assets/imgs/${product.imgList[0]}`;

    const name = itemElement.querySelector('.name');
    name.innerText = product.name;


    const Quantity = itemElement.querySelector('.quantity');
    Quantity.innerText = quantity;

    const price = itemElement.querySelector('.price');
    price.innerText = `$${product.price}.00`;
    
    const x = itemElement.querySelector('.x');
    x.addEventListener('click', () => {
        removeCartItem(product.id);
    })

    return itemElement;
}

const buildFavItems = (product) => {
    const itemTemplate = document.querySelector('#favItem');
    const itemFragment = itemTemplate.content.cloneNode(true);
    const itemElement = itemFragment.querySelector('.item-container');


    const img = itemElement.querySelector('img');
    img.src = `assets/imgs/${product.imgList[0]}`;

    const name = itemElement.querySelector('.name');
    name.innerText = product.name;

    const price = itemElement.querySelector('.price');
    price.innerText = `$${product.price}.00`;
    
    const x = itemElement.querySelector('.x');
    x.addEventListener('click', () => {
        removeFavItem(product.id);
    })

    return itemElement;
}

export const addCartItem = (product=null, number=1) => {
    if (product != null) {
        alert("Add product to cart successfully!");
        const index = cartItemList.findIndex((item) => {
            return item.product.id == product.id;
        })
        if (index == -1) {
            cartItemList.push({
                product: product,
                quantity: number
            });
        }
        else {
            cartItemList[index].quantity += number;
        }
        localStorage.setItem('cartItemList', JSON.stringify(cartItemList));
    }
    updateCartItem();
}
const removeCartItem = (id) => {
    const index = cartItemList.findIndex((item) => {
        return item.product.id == id;
    });
    cartItemList.splice(index, 1);
    localStorage.setItem('cartItemList', JSON.stringify(cartItemList));
    updateCartItem();
}

const updateCartItem = () => {
    let cartItemList = JSON.parse(localStorage.getItem('cartItemList')) ? JSON.parse(localStorage.getItem('cartItemList')) : [];
    const cartButton = document.querySelector('.cart-button');
    const itemsNumber = cartButton.querySelector('.items-number');
    const itemsContainer = cartButton.querySelector('.list');

    let totalPrice = 0;
    let totalQuantity = 0;
    for(let item of cartItemList) {
        totalPrice += (item.product.price * item.quantity);
        totalQuantity += item.quantity;
    }

    const totalPriceElement = document.querySelector('.total-price');
    totalPriceElement.innerText = `$${totalPrice}.00`;
    itemsNumber.innerText = `(${totalQuantity})`;
    
    itemsContainer.innerHTML = "";
    cartItemList.forEach( async (item) => {
        const itemElement = buildCartItems(item.product, item.quantity);
        itemsContainer.appendChild(itemElement);
    });


    if (cartItemList.length == 0) {
        cartButton.querySelector('.empty-text').style.display = 'block';
        cartButton.querySelector('.cart-bottom-container').style.display = 'none';
        return;
    }
    cartButton.querySelector('.cart-bottom-container').style.display = 'block';
    cartButton.querySelector('.empty-text').style.display = 'none';
}


export const addFavItem = (product=null) => {
    if (product != null) {
        const index = favItemList.findIndex((item) => {
            return item.product.id == product.id;
        })
        if (index == -1) {
            favItemList.push({
                product: product
            });
        }
        else {
            favItemList[index].quantity += number;
        }
        localStorage.setItem('favItemList', JSON.stringify(favItemList));
        alert("Add product to favorite list successfully!");
    }
    updateFavItem();
}
const removeFavItem = (id) => {
    const index = favItemList.findIndex((item) => {
        return item.product.id == id;
    });
    favItemList.splice(index, 1);
    localStorage.setItem('favItemList', JSON.stringify(favItemList));
    updateFavItem();
}

const updateFavItem = () => {
    let favItemList = JSON.parse(localStorage.getItem('favItemList')) ? JSON.parse(localStorage.getItem('cartItemList')) : [];
    const favButton = document.querySelector('.favorite-button');
    const itemsContainer = favButton.querySelector('.list');
    const itemsNumber = favButton.querySelector('.items-number');
    
    let totalQuantity = cartItemList.length;
    itemsNumber.innerText = `(${totalQuantity})`;
    

    itemsContainer.innerHTML = "";
    favItemList.forEach((item) => {
        const itemElement = buildFavItems(item.product);
        itemsContainer.appendChild(itemElement);
    });


    if (favItemList.length == 0) {
        favButton.querySelector('.empty-text').style.display = 'block';
        return;
    }
    favButton.querySelector('.empty-text').style.display = 'none';
}

// main
export const API_URL = 'https://6330fae0591935f3c897a87e.mockapi.io';

export const getData = async (url=API_URL, queryParams=null) => {
    const jsonData = await fetch(url);
    const data = await jsonData.json();
    return data;
}

export const buildReview = (product, element) => {
    const blackStars = element.querySelectorAll("i.black");
    const whiteStars = element.querySelectorAll("i.white");
    let averageReview = 0;
    product.reviewList.forEach((review) => {
        averageReview += review.star;
    });
    averageReview = Math.round(averageReview / product.reviewList.length);
    for (let i = 0; i < averageReview; i++) {
        whiteStars[i].classList.remove("active");
        blackStars[i].classList.add("active");
    }
}


export const buildProductCard = (product) => {
    const cardTemplate = document.querySelector("#cardTemplate");
    const cardFragment = cardTemplate.content.cloneNode(true);
    const cardElement = cardFragment.querySelector(".product-card-container");
    
    const a = cardElement.querySelector(".product-card .a");
    a.href=`product-detail.html?id=${product.id}`;

    const img = cardElement.querySelector("img");
    img.src = `assets/imgs/${product.imgList[0]}`;

    const New = cardElement.querySelector(".new");
    New.style.display = product.new ? 'block' : 'none';
    const sold = cardElement.querySelector(".sold");
    sold.style.display = product.sold ? 'block' : 'none';
    const sale = cardElement.querySelector(".sale");
    sale.style.display = product.sale.sale ? 'block' : 'none';

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
    });

    const addToFavIcon = cardElement.querySelector(".heart-icons");
    const whiteHeart = addToFavIcon.querySelector(".white");
    const blackHeart = addToFavIcon.querySelector(".black");
    if (favItemList.findIndex((item) => {
        return product.id == item.product.id;
    
    }) == -1) {
        whiteHeart.classList.add("active");
        blackHeart.classList.remove("active");
    }
    else {
        blackHeart.classList.add("active");
        whiteHeart.classList.remove("active");
    }
    addToFavIcon.addEventListener("click", (e) => {
        e.preventDefault();
        addFavItem(product);
    });

    buildReview(product, cardElement);

    return cardElement;
}