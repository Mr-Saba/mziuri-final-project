//image-ების არჩევა

const mainImage = document.querySelector('.mainImage > img')
const thumbnailImages = Array.from(document.querySelectorAll('.lastImages > img'))

thumbnailImages.forEach(el => {
    el.addEventListener('click', () => {
        let previouslyActiveEl = thumbnailImages.find(el => el.classList.contains('active'))
        previouslyActiveEl.classList.remove('active')
        el.classList.add('active')
        mainImage.src = el.src
    })
})

//fullscreen-ზე გასვლა
const fullScreenButton = document.querySelector('.mainImage > button')
fullScreenButton.addEventListener('click', () => {
    mainImage.requestFullscreen()
})