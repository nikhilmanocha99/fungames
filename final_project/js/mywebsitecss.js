const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul ');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
});
function hidemennu() {
    document.querySelector('.swiper-wrapper').classList.toggle('swiper-container');
    document.querySelector('.swiper-container').classList.toggle('swiper-slide');
    
}
document.querySelector('.nav-list').addEventListener('click', hidemennu);