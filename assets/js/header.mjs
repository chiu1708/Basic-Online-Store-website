import { updateCartItem, updateFavItem } from './utils.js';


updateCartItem();
updateFavItem();

const hiddenHeaderX = document.querySelector('#hidden-header .content-container .x');
const hiddenHeader = document.querySelector('#hidden-header');
const hamburger = document.querySelector('header .hamburger-button');
const resNav = document.querySelector('#res-nav');
let isOpen = false;

hiddenHeaderX.addEventListener('click', () => {
    hiddenHeader.style.transform = 'translateY(-100%)';
});
hamburger.addEventListener('click', () => {
    if (window.innerWidth > 1025) {
        hiddenHeader.style.transform = 'translateY(100%)';
    }
    else {
        if (isOpen) {
            resNav.style.transform = 'translateY(-100%)';
            hamburger.classList.remove('open');
            isOpen = false;
        }
        else {
            resNav.style.transform = 'translateY(100%)';
            hamburger.classList.add('open');
            isOpen = true;
        }
    }
})


const resNavIcons = document.querySelectorAll('#res-nav .icon');

resNavIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
        if (icon.style.transform == 'rotate(0deg)') {
            icon.style.transform = 'rotate(-90deg)';
            document.querySelectorAll('#res-nav ul li ul')[index].style.height = '0';
        }
        else {
            icon.style.transform = 'rotate(0deg)';
            document.querySelectorAll('#res-nav ul li ul')[index].style.height = '100%';
        }
    })
})