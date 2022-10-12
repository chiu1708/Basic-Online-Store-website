const hoverUnderLineElements = document.querySelectorAll('.hover-underline');
console.log(hoverUnderLineElements);

const hoverUnderLineEvent = async (element) => {
    const underline = element.querySelector('.hover-line');
    underline.style.transformOrigin = 'bottom right';
    setTimeout(() => {underline.style.transform = 'scaleX(0)';}, 200)
    setTimeout(() => {underline.style.transformOrigin = 'bottom left';}, 400);
    setTimeout(() => {underline.style.transform = 'scaleX(1)'}, 600);
}

hoverUnderLineElements.forEach((hoverUnderLineElement) => {
    hoverUnderLineElement.addEventListener('mouseover', (e) => {
        e.preventDefault();
        hoverUnderLineEvent(hoverUnderLineElement);
    })
});