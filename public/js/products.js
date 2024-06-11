//filters
const form = document.querySelector('.filtersContainer form')
const colorFilterElems = Array.from(document.querySelectorAll('.filtersContainer form .colorFilter input'))
const priceFilterElems = Array.from(document.querySelectorAll('.filtersContainer form .priceFilter input'))

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const selectedColors = colorFilterElems
        .filter(item => item.checked)
        .map(item => item.value)

    const selectedMinPrice = priceFilterElems[0].value
    const selectedMaxPrice = priceFilterElems[1].value

    const bodyData = {
        colors: selectedColors,
        price: {
            min: selectedMinPrice,
            max: selectedMaxPrice
        }
    }

    getFilteredProducts(bodyData)
})

form.addEventListener('reset', () => {
    const bodyData = {
        colors: [],
        price: {
            min: '',
            max: ''
        }
    }

    getFilteredProducts(bodyData)
})


function getFilteredProducts(bodyData) {
    fetch('/api/product/filter', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData)
    })
        .then(res => res.json())
        .then(data => {
            displayData(data.products)
        })
}

function displayData(products) {
    const productsContainer = document.querySelector('.productsContainer')
    productsContainer.innerHTML = ''
    products.forEach(el => {
        productsContainer.innerHTML += `
            <div class="product">
                <a href="/products/${ el.id }">
                    <img src="${ el.imageSrc[0] }" alt="">
                </a>
                <div class="descriptionContainer">
                    <p class="title">${ el.title }</p>
                    <p class="price">${ el.price }$</p>
                </div>
            </div>
        `
    })
}
