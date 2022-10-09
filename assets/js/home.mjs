import { addCartItem } from './utils.js';

const toProductList = () => {
    window.location.href = 'product-list.html';
}

document.querySelector('button.shop-now').addEventListener('click', toProductList);

addCartItem();