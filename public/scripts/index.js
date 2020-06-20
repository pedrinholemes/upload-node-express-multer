const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")
const closeFull = document.querySelector("#modal  a.fullButton")
const restricArea = document.querySelector("#page-home main a.area")

buttonSearch.addEventListener('click', () => {
    window.location = '/posts'
})
restricArea.addEventListener('click', () => {
    modal.classList.remove('hide')
})
close.addEventListener('click', () => {
    modal.classList.add('hide')
})
closeFull.addEventListener('click', () => {
    modal.classList.add('hide')
})