// import './scss/main.scss'
// console.log('JS loaded!')

const productPanel = document.querySelector('.product-panel')
const stepControl = document.getElementById('step-control')
const btnControl = document.querySelector('.control-panel')
const steps = stepControl.querySelectorAll('.step')
const formParts = document.querySelectorAll('.part')
const nextBtn = btnControl.querySelector('.next-step')
const prevBtn = btnControl.querySelector('.last-step')
const cart = document.querySelector('.cart-panel')
const amountTotal = cart.querySelector('.amount-total')
const logo = document.querySelectorAll('.logo')
const searchIcon = document.querySelector('.search-icon')
const cartIcon = document.querySelector('.cart-icon')
const shippingTotal = document.querySelector('.shipping-total')



const products = [
  {
    id: 13,
    name: '破壞補丁修身牛仔褲',
    price: 3999,
    quantity: 1,
    img: './src/img/Block.png',
  },
  {
    id: 2,
    name: '刷色直筒牛仔褲',
    price: 1999,
    quantity: 1,
    img: './src/img/Block(1).png',
  }
]

let transportFee = 0

const displayProduct = () => {
  products.forEach((product) => {
    productPanel.innerHTML += `
      <div class="product d-flex justify-content-between">
        <img class="product-photo" src="${product.img}" alt="">
        <div class="product-info w-40 d-flex flex-column align-items-end justify-content-between">
          <div class="name">${product.name}</div>
          <div class="count">
            <span class='d-none'> ${product.id} </span>
            <img class='minus' src="./src/img/minus.png" alt="">
            <span>${product.quantity}</span>
            <img class='plus' src="./src/img/plus.png" alt="">
          </div>
          <div class="price"><span>${(product.price * product.quantity).toLocaleString('zh-TW', { maximumFractionDigits: 0, style: 'currency', currency: 'TWD' })}</span></div>
        </div>
      </div>
    `
  })

}

displayProduct()

//上一步下一步
let step = 0

function handleBtnControlClicked(e) {
  e.preventDefault()
  const nowStep = steps[step]
  if (e.target.matches('.next-step') && e.target.innerHTML === '下一步 →') {
    const nextStep = steps[step + 1]
    nowStep.classList.remove('active')
    nowStep.classList.add('checked')
    nextStep.classList.add('active')
    
    formParts[step].classList.toggle('d-none')
    formParts[step + 1].classList.toggle('d-none')
    step += 1
    console.log(step)
  } else if (e.target.matches('.last-step')) {
    const prevStep = steps[step - 1]
    nowStep.classList.remove('active')
    prevStep.classList.remove('checked')
    prevStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step - 1].classList.toggle('d-none')
    step -= 1
    console.log(step)
  }
  setBtnDisabled()
}

function setBtnDisabled() {
  if (step === 0) {
    prevBtn.classList.add('d-none')
    nextBtn.classList.add('first-next-step')
  } else {
    nextBtn.classList.remove('first-next-step')
    prevBtn.classList.remove('d-none')
  }

  if (step === 2) {
    nextBtn.innerHTML = '送出申請'
  } else {
    nextBtn.innerHTML = '下一步 →'
  }
}

const controlQuantity = e => {
  let target = e.target
  if (target.classList.contains('plus')) {
    const productID = target.parentElement.children[0].innerHTML
    console.log(`plus product id : ${productID}`)
    const isID = (product) => Number(product.id) === Number(productID)
    const productIndex = products.findIndex(isID)
    console.log(`productIndex ${productIndex}`)
    products[productIndex].quantity = Number(products[productIndex].quantity) + 1
    target.nextElementSibling.innerHTML = products[productIndex].quantity
    target.parentElement.nextElementSibling.children[0].innerHTML = (products[productIndex].quantity * products[productIndex].price).toLocaleString('zh-TW', { maximumFractionDigits: 0, style: 'currency', currency: 'TWD' })
  } else if (target.classList.contains('minus')) {
    const productID = target.parentElement.children[0].innerHTML
    console.log(`minus product id : ${productID}`)
    const isID = (product) => Number(product.id) === Number(productID)
    const productIndex = products.findIndex(isID)
    console.log(`productIndex ${productIndex}`)
    if (products[productIndex].quantity > 0) {
      products[productIndex].quantity = Number(products[productIndex].quantity) - 1
    } else {
      products[productIndex].quantity = 0
    }
    target.previousElementSibling.innerHTML = products[productIndex].quantity
    target.parentElement.nextElementSibling.children[0].innerHTML = (products[productIndex].quantity * products[productIndex].price).toLocaleString('zh-TW', { maximumFractionDigits: 0, style: 'currency', currency: 'TWD' })
  }
  let money = 0
  products.forEach(product =>
    money = money + product.price * product.quantity
  )
  amountTotal.innerHTML = (money + transportFee).toLocaleString('zh-TW', { maximumFractionDigits: 0, style: 'currency', currency: 'TWD' })
}

btnControl.addEventListener('click', handleBtnControlClicked)
cart.addEventListener('click', controlQuantity)


// control outline of the transport method part
const focus = document.querySelectorAll('input[name="transport"]')

console.log(focus)

focus[0].addEventListener('click', function () {
  dhlOrNot = false
  focus[0].parentElement.classList.add('selected')
  focus[1].parentElement.classList.remove('selected')
  dhlOrNot = false
  console.log('remove dhl')
  removeDhl()
})

focus[1].addEventListener('click', function () {
  dhlOrNot = true

  focus[0].parentElement.classList.remove('selected')
  focus[1].parentElement.classList.add('selected')
  dhlOrNot = true
  console.log('add dhl')
  addDhl()

})

// transport fee
const addDhl = () => {
  let money = 0
  transportFee = 500
  products.forEach(product =>
    money = money + product.price * product.quantity
  )
  amountTotal.innerHTML = (money + transportFee).toLocaleString('zh-TW', { maximumFractionDigits: 0, style: 'currency', currency: 'TWD' })
  shippingTotal.innerHTML = (500).toLocaleString('zh-TW', { maximumFractionDigits: 0, style: 'currency', currency: 'TWD' })
}

const removeDhl = () => {
  let money = 0
  transportFee = 0
  products.forEach(product =>
    money = money + product.price * product.quantity
  )
  shippingTotal.innerHTML = '免費'
  amountTotal.innerHTML = (money + transportFee).toLocaleString('zh-TW', { maximumFractionDigits: 0, style: 'currency', currency: 'TWD' })
}


// dark mode

const darkModeToggle = document.getElementById("dark__mode__toggle");
const darkModeToggleHandler = e => {
  let target = e.target
  if (target.classList.contains('lightmode')) {
    document.documentElement.setAttribute("data-theme", "dark");
    console.log('set to dark mode')
    darkModeToggle.innerHTML = `<img class='darkmode' src="./src/img/sun.png" alt="">`
    searchIcon.innerHTML = ` <img src="./src/img/search.png" alt="">`
    cartIcon.innerHTML = ` <img src="./src/img/shop.png" alt="">`
    logo[0].innerHTML = `<img src="./src/img/Logo.png" alt="">`
    logo[1].innerHTML = `<img src="./src//img/Logo.png" alt="">`
  } else if (target.classList.contains('darkmode')) {
    document.documentElement.setAttribute("data-theme", "light");
    console.log('set to light mode')
    darkModeToggle.innerHTML = `<img class='lightmode' src="/src/iconc.png" alt="">`
    searchIcon.innerHTML = ` <img src="/src/icona.png" alt="">`
    cartIcon.innerHTML = ` <img src="/src/iconb.png" alt="">`
    logo[0].innerHTML = `<img src="/src/Logo.png" alt="">`
    logo[1].innerHTML = `<img src="/src/Logo.png" alt="">`
  }
}
darkModeToggle.addEventListener("click", darkModeToggleHandler);