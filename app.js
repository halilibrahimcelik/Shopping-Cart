//Selecting DOM elements
const productsElementMen = document.querySelector(".products-men");
const productsElementWomen = document.querySelector(".products-women");
const cartItems = document.querySelector(".cart-item");
const subTotalElement = document.querySelector(".subtotal");
const taxElement = document.querySelector(".taxes");
const shippingElement = document.querySelector(".shipping");
const totalElement = document.querySelector(".totalPrice");
const itemCartElement = document.querySelector(".total-itemCart");
const removeBtn = document.getElementById("removeBtn");

//Rendering Products

function renderProducts() {
  productsMen.forEach((product) => {
    productsElementMen.innerHTML += `
    <div class="card col-12 col-sm-6 col-md-4">
    <div class="img-wrapper"><img src="${product.imgSrc}" class="card-img-top" /></div>
    <div class="d-flex flex-column card-body justify-content-center align-self-center">
      <h5 class="card-title text-center">${product.name}</h5>
      <h5 class="card-title text-center">${product.price}</h5>
      <p class="card-text">
      ${product.description}
      </p>
      <div class="add-to-cart align-self-center" onclick="addToCartHandler(${product.id})">
        <a  class="btn btn-danger">Add To Cart</a>
      </div>
    </div>
    </div>
    `;
  });

  productsWomen.forEach((product) => {
    productsElementWomen.innerHTML += `
    <div class="card col-12 col-sm-6 col-md-4">
    <div class="img-wrapper"><img src="${product.imgSrc}" class="card-img-top" /></div>
    <div class="d-flex flex-column card-body justify-content-center align-self-center">
      <h5 class="card-title text-center">${product.name}</h5>
      <h5 class="card-title text-center">${product.price}</h5>
      <p class="card-text">
      ${product.description}
      </p>
      <div class="add-to-cart align-self-center" onclick="addToCartHandler(${product.id})">
        <a  class="btn btn-danger">Add To Cart</a>
      </div>
    </div>
  </div>
    `;
  });
}
renderProducts();

//Adding Products to the Cart
let cart = JSON.parse(localStorage.getItem("acaba")) || [];
// let cart = [];
updateCart();
function addToCartHandler(id) {
  //checking if product id exist in our cart array
  if (cart.some((item) => item.id === id)) {
    // alert("Product has already been added to the cart");
    changeQuantity("plus", id);
  } else {
    const itemMen = productsMen.find((prod) => prod.id === id);
    const itemWomen = productsWomen.find((prod) => prod.id === id);
    if (itemMen) {
      cart.push({
        ...itemMen,
        numberOfUnits: 1, //I added a new value to our array
        tax: 0.18,
        shipping: 15,
      });
    }

    if (itemWomen) {
      cart.push({
        ...itemWomen,
        numberOfUnits: 1,
        tax: 0.18,
        shipping: 15,
      });
    }
  }

  updateCart();
}

//changing number of quantity for an item
// Again we work with our cart array if it matches we increment or decrement the quantity

function changeQuantity(operation, id) {
  cart = cart.map((item) => {
    numberOfUnits = item.numberOfUnits;
    if (item.id === id) {
      if (operation === "minus") {
        if (numberOfUnits > 0) numberOfUnits--;
      } else if (operation === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    //object destructring
    return {
      ...item,
      numberOfUnits: numberOfUnits,
    };
  });
  console.log("clik", cart.tax);
  updateCart();
}

//updating Cart

function updateCart() {
  renderCartItems();
  renderSubTotal();

  localStorage.setItem("acaba", JSON.stringify(cart));
}

//calculating  and rendering subtotal

function renderSubTotal() {
  let subTotal = 0,
    totalItems = 0,
    totalShipping = 0,
    totalTax = 0,
    totalPrice = 0;

  cart.forEach((item) => {
    subTotal += parseInt(item.price * item.numberOfUnits);
    totalItems += item.numberOfUnits;
    totalShipping += item.shipping * item.numberOfUnits;
    totalTax += parseInt(item.price * item.tax) * item.numberOfUnits;
    totalPrice += subTotal + totalItems + totalTax;
  });
  subTotalElement.innerHTML = `
    Subtotal (${totalItems} items): $${subTotal}
    `;
  shippingElement.innerHTML = `
    Shipping 15$: $${totalShipping}
    `;
  taxElement.innerHTML = `
  Tax (18%): $${totalTax}
    `;
  totalElement.innerHTML = `
  Total (${totalItems} items): $${totalPrice}
    `;
  itemCartElement.innerHTML = `
     ${totalItems}
    
    `;
}

function renderCartItems() {
  cartItems.innerHTML = ""; //we prevent multiple editing
  cart.forEach((item) => {
    cartItems.innerHTML += `
            <div class="row cart-info align-items-center text-center">
            <div class="col-12 col-lg-4 cart-info-img">
            <img class="cart-img"
                src="${item.imgSrc}"
                alt="${item.name}"
                
              />
              <p>${item.name}</p>
            </div>
            <div class="col-12 col-lg-4 cart-info-price">${item.price}</div>
    
            <div class="col-12 col-lg-4 d-flex flex-column gap-2 buttons">
            <div
                class="d-flex unit-btns justify-content-center justify-content-lg-evenly"
              >
                <a class="btn btn-warning m-1" id="minus-product1" onclick="changeQuantity('minus', ${item.id})">
                  -
                </a>
                <p class="number m-0 align-self-center">${item.numberOfUnits}</p>
                <a class="btn btn-warning m-1" id="plus-product1" onclick="changeQuantity('plus', ${item.id})">
                  +
                </a>
              </div>
              <a id="removeBtn" class="btn btn-danger remove m-auto"  onclick="removeCartHandler( ${item.id})" >
                Remove
                </a>
            </div>
            </div>`;
  });
}

// removeBtn.addEventListener("click", removeCartHandler);
//removing Cart from list
function removeCartHandler(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}
