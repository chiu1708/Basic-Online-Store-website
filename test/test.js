const imgs = document.querySelectorAll('img');

imgs.forEach((img, index) => {
    img.addEventListener('click', () => {
        imgs.forEach((i) => {
            i.classList.remove('active');
        })
        imgs[index + 1 == 1 ? 1 : 0].classList.add('active');
    })
})