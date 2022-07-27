// import './scss/main.scss'
// console.log('JS loaded!')

const productPanel = document.querySelector('.product-panel')
const stepControl = document.getElementById('stepper-control')
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
const cartFare = document.querySelector('.transport-price')

let transportFee = 0



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


const displayProduct = () => {
  products.forEach((product) => {
    productPanel.innerHTML += `
      <div class="product d-flex justify-content-between">
        <img class="product-photo" src="${product.img}" alt="">
        <div class="product-info w-40 d-flex flex-column align-items-end justify-content-between">
          <div class="name">${product.name}</div>
          <div class="count">
            <img class='minus' data-id="${product.id
        }" src="./src/img/minus.png" alt="">
            <span class="quantity-box">${product.quantity}</span>
            <img class='plus' data-id="${product.id
        }" src="./src/img/plus.png" alt="">
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
    prevBtn.classList.add('first-last-step')
    nextBtn.classList.add('first-next-step')
  } else {
    nextBtn.classList.remove('first-next-step')
    prevBtn.classList.remove('first-last-step')
  }

  if (step === 2) {
    nextBtn.innerHTML = '送出申請'
  } else {
    nextBtn.innerHTML = '下一步 →'
  }
}

// 處理購買數量增減及分項金額變化
function onQuantityBtnClicked(event) {
  const productId = Number(event.target.dataset.id)
  const isID = (product) => Number(product.id) === Number(productId)
  const productIndex = products.findIndex(isID)
  

  console.log(productId)
  console.log(productIndex)
  console.log(isID)
  console.log(event.target.dataset)
 

  if (
    event.target.className !== "plus" &&
    event.target.className !== "minus"
  ) {
    return
  }

  if (event.target.className === "plus") {
    // qua += 1
    // console.log(qua)
    // quantityBox.innerText = qua
    // console.log(quantityBox.innerText)
    products[productIndex].quantity = Number(products[productIndex].quantity) + 1
    event.target.previousElementSibling.innerHTML = products[productIndex].quantity
    console.log(products[productIndex].quantity)
    
  } else if (event.target.className === "minus") {
    // if (qua <= 0) {
    //   return
    // }
    // qua -= 1
    // console.log(qua)
    // quantityBox.innerText = qua
    if (products[productIndex].quantity > 0) {
      products[productIndex].quantity = Number(products[productIndex].quantity) - 1
    } else {
      products[productIndex].quantity = 0
    }
    event.target.nextElementSibling.innerHTML = products[productIndex].quantity
  }
  // products.forEach(product =>
  //   money = money + product.price * product.quantity
  // )

  // amountTotal.innerHTML = money.toLocaleString('zh-TW', { maximumFractionDigits: 0, style: 'currency', currency: 'TWD' })
  priceTotal()
}

//運費
const focus = document.querySelectorAll('input[name="transport"]')

console.log(focus)
dhlOrNot = false

focus[0].addEventListener('click', function () {
  focus[0].parentElement.classList.add('selected')
  focus[1].parentElement.classList.remove('selected')
  removeDhl()
})

focus[1].addEventListener('click', function () {
  focus[0].parentElement.classList.remove('selected')
  focus[1].parentElement.classList.add('selected')
  dhlOrNot = true
  addDhl()

})

const addDhl = () => {
  transportFee = 500  
  shippingTotal.innerHTML = (500).toLocaleString('zh-TW', { maximumFractionDigits: 0, style: 'currency', currency: 'TWD' })
  priceTotal()
}

const removeDhl = () => {
  transportFee = 0
  shippingTotal.innerHTML = '免費'
  priceTotal()
}

const priceTotal = () => {
  let money = 0
  products.forEach(product =>
    money = money + product.price * product.quantity
  )
  amountTotal.innerHTML = (money + transportFee).toLocaleString('zh-TW', { maximumFractionDigits: 0, style: 'currency', currency: 'TWD' })
}

btnControl.addEventListener('click', handleBtnControlClicked)
cart.addEventListener('click', onQuantityBtnClicked)


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