import { getData, API_URL, buildReview, buildProductCard } from './utils.js';

const search = window.location.search;
const param = new URLSearchParams(search);
let current = param.get('page');
if (current==null) {
    window.location.href += '?page=1';
}
let pageNumber = param.get('page');
let pageCategory = param.get('category')? param.get('category') : "";
let pageTag = param.get('tag')? param.get('tag') : "";
pageNumber = pageNumber == null ? 1 : pageNumber;
let cardEnd = pageNumber * 12;
let cardStart = cardEnd - 12;
const allProductsData = await getData(`${API_URL}/product`);
let products;


if (pageCategory != "") {
    products = await getData(`${API_URL}/product?categoriesList=${pageCategory}`);
}
else if (pageTag != "") {
    products = await getData(`${API_URL}/product?tagsList=${pageTag}`);
}
else {
    products = allProductsData;
}







const toggleSortTypeList = () => {
    let isDisplayBlock = document.querySelector('.sort-type-list');
    isDisplayBlock.style.display = isDisplayBlock.style.display == 'block' ? 'none': 'block';
}
const currentSortType = document.querySelector('.sort-type.current');
currentSortType.addEventListener('click', toggleSortTypeList);
const sortTypes = document.querySelectorAll('.sort-type-list .sort-type');
const sort = () => {
}
const setActiveSortType = (id) => {
    const activeTarget = document.querySelector(`#${id}`);
    const activeText = document.querySelector('.current.sort-type span');
    sortTypes.forEach(function(element) {
        element.classList.remove('active');
    })
    activeTarget.classList.add('active');
    activeText.innerText = activeTarget.innerText;
    sort();
}

sortTypes.forEach((element) => {
    element.addEventListener('click', function() {
        const id = element.id;
        setActiveSortType(id);
    })
})

const addProductCard = async (productsList=products, cardStart=0, cardEnd=productsList.length) => {
    addPageNavContent(productsList);
    const cardsContainer = document.querySelector("#products .cards-container");
    for (let i = cardStart; i < cardEnd; i++) {
        let cardElement = await buildProductCard(productsList[i]);
        cardsContainer.appendChild(cardElement);
    }
}

const addPageNavContent = (products) => {
    const pageNumber = Math.ceil(products.length / 12);
    if (pageNumber === 1) {
        document.querySelector('.page-nav').style.display = 'none';
        return;
    }
    const pageNav = document.querySelector('.page-nav ul');
    const prevBtn = document.querySelector('.page-nav .prev-btn i');
    const nextBtn = document.querySelector('.page-nav .next-btn i');
    const variable = `${pageCategory?`category=${pageCategory}&`:pageTag?`tag=${pageTag}&`:""}`;
    if (current == 1) {
        prevBtn.style.display = 'none';
    }
    prevBtn.addEventListener('click', () => {
        window.location.href = `product-list.html?${variable}page=${current - 1}`  
    })
    if (current == pageNumber) {
        nextBtn.style.display = 'none';
    }
    nextBtn.addEventListener('click', () => {
        window.location.href = `product-list.html?${variable}page=${Number(current) + 1}`;
    })
    pageNav.innerHTML = "";
    for(let i = 0; i< pageNumber; i++) {
        pageNav.innerHTML += `<li><a href="product-list.html?page=${i + 1}">${i + 1}</a></li>`;
    }
    const activeLi = pageNav.querySelector(`li:nth-child(${current})`);
    activeLi.classList.add('active');
}

const buildCategory = (category) => {
    const categoryTemplate = document.querySelector('#category');
    const categoryFragment = categoryTemplate.content.cloneNode(true);
    const categoryElement = categoryFragment.querySelector('li');

    const name = categoryElement.querySelector('.name');
    name.innerText = category.name;

    const number = categoryElement.querySelector('.number');
    let num = 0;
    allProductsData.forEach((product) => {
        if (product.categoriesList.includes(category.name)) {
            ++num;
        }
    })
    number.innerText = `(${num})`;

    return categoryElement;
}

const addCategory = async () => {
    const categoryListContainer = document.querySelector('.categories-list-container ul');
    const categories = await getData(`${API_URL}/category`);
    categories.forEach((category) => {
        let categoryElement = buildCategory(category);
        categoryListContainer.appendChild(categoryElement);
    })
}

const buildTag = (tag) => {
    const tagTemplate = document.querySelector('#tag');
    const tagFragment = tagTemplate.content.cloneNode(true);
    const tagElement = tagFragment.querySelector('p');

    const a = tagElement.querySelector('a');
    a.innerText = tag.name;

    return tagElement;
}

const addTag = async () => {
    const tagContainer = document.querySelector('.tags-container');
    const tags = await getData(`${API_URL}/tag`);
    tags.forEach((tag) => {
        let tagElement = buildTag(tag);
        tagContainer.appendChild(tagElement);
    })
}

const buildBestSellerProduct = (bestSellerProduct) => {
    const bestSellerProductTemplate = document.querySelector('#bestSeller');
    const bestSellerProductFragment = bestSellerProductTemplate.content.cloneNode(true);
    const bestSellerProductElement = bestSellerProductFragment.querySelector('.product-container');
    
    bestSellerProductElement.href = `product-detail.html?id=${bestSellerProduct.id}`;

    const img = bestSellerProductElement.querySelector('img');
    img.src = `assets/imgs/${bestSellerProduct.imgList[0]}`;

    const name = bestSellerProductElement.querySelector('.name');
    name.innerText = bestSellerProduct.name;

    buildReview(bestSellerProduct, bestSellerProductElement);
    
    const price = bestSellerProductElement.querySelector('.price');
    price.innerText = `$${bestSellerProduct.price}.00`;
    
    return bestSellerProductElement;
}

const addBestSeller = () => {
    const bestSellerContainer = document.querySelector('.best-seller-container');
    const bestSellerProducts = [];
    allProductsData.forEach((product) => {
        if (product.bestSeller) {
            bestSellerProducts.push(product);
        }
    });
    bestSellerProducts.forEach((bestSellerProduct) => {
        let bestSellerProductElement = buildBestSellerProduct(bestSellerProduct, bestSellerProduct);
        bestSellerContainer.appendChild(bestSellerProductElement);
    })
}

const buildCategoriesFilter = async () => {
    await addCategory();
    
    const categoriesFilterElement = document.querySelectorAll('.categories-filter .categories-list-container ul li');
    categoriesFilterElement.forEach((category) => {
        const name = category.querySelector('.name');
        const a = category.querySelector('a');
        a.href = `product-list.html?category=${name.innerText}&page=1`;
    })
}

const buildTagsFilter = async () => {
    await addTag();
    
    const tagsFilterElement = document.querySelectorAll('.tags-filter .tags-container p');
    tagsFilterElement.forEach((tag) => {
        const a = tag.querySelector('a');
        const name = a.innerText;
        a.href = `product-list.html?tag=${name}&page=1`;
    })
}

const searchFunction = () => {
    const filter = document.querySelector('.search input').value;
    const cardsContainer = document.querySelector('.cards-container');
    let name, category, price;
    const cardContainers = cardsContainer.querySelectorAll('.product-card-container');
}

const submitSearch = document.querySelector('.submit-search');
submitSearch.addEventListener('click', (e) => {
    e.preventDefault();
    searchFunction();
});


addProductCard(products, cardStart, cardEnd);
addBestSeller();
buildCategoriesFilter();
buildTagsFilter();