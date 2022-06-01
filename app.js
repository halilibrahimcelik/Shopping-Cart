//Selecting DOM elements
const productsElementMen = document.querySelector(".products-men");
const productsElementWomen = document.querySelector(".products-women");

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

  productWomen.forEach((product) => {
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

function addToCartHandler(id) {
  console.log(id);
}

//Adding Products to the Cart
