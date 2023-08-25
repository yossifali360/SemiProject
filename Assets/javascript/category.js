const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
const productsData = JSON.parse(localStorage.getItem("products"));
const products = document.querySelector(".products")
let data = productsData.filter((product) => product.category == category);
const selectElement = document.getElementById("brand");
const brandNames = [];
if (category == null){
	data = productsData
}
// Load All Products
let elements = ""
data.forEach(product => {
    elements += loadProducts(product)
});
products.innerHTML=elements;
// Store Distinct Brand Name in brandNames array
for (let i = 0; i < data.length; i++) {
	  const brand = data[i].Brand;
	  if (!brandNames.includes(brand)) {
	brandNames.push(brand);
	  }
}
// Add option to every brand name
brandNames.forEach(brandName => {
  const option = document.createElement("option");
  option.className = brandName;
  option.value = brandName;
  const productsNumber = data.filter(product => product.Brand === brandName).length
  option.textContent = brandName + "(" + productsNumber + ")";
  selectElement.appendChild(option);
});
// Filter Products On Change
selectElement.addEventListener("change", function() {
  const selectedBrand = selectElement.value;
  products.innerHTML = ""; 
  data.forEach(product => {
	if (selectedBrand === "All"){
		products.innerHTML += loadProducts(product);
	}
    else if (product.Brand === selectedBrand) {
      	products.innerHTML += loadProducts(product);
    }
  });
});


// Function Load Products
function loadProducts(product) {
	return `<div class="col-3">
	<div class="productCard border-4 rounded-2 h-100" data-id="${product.id}">
	  <div class="overflow-hidden h-100 d-flex flex-column align-items-stretch justify-content-between">
		<div class="position-relative h-100">
		  <img class="card-img-top rounded-pill mx-auto my-4 d-block p-1" src="${product.images[0]}" alt="Card image cap">
		  <div class="cardIcons p-1 d-flex flex-column position-absolute">
		  <i class="fa-regular fa-heart p-2 heartIcon"></i>
		  <i class="fas fa-magnifying-glass p-2 viewIcon"></i>
		  </div>
		  <div class="icon-text position-absolute" id="icon-text">
		  <span class="bg-danger m-2 p-1 rounded-4 text-center hiddenHeart text-white mx-4">Add to Wishlist</span>
		  <span class="bg-danger m-2 p-1 rounded-4 text-center hiddenVeiw text-white mx-4">View</span>
		  </div>
		</div>
		<div class="card-body text-center px-2 h-100">
		  <a href="#" class="card-title h4 fs-3 text-decoration-none ">${splitCardTitle(product).cardTitle}</a>
		</div>
		<div class="text-center h-100">
		  <h6 class="text-danger fs-3"><span class="price">${product.price}</span><span class="priceSign"> EGP</span></h6>
		  <button class="btn btn-info d-block m-auto mb-4 addToCart">Add To Cart</button>
		</div>
	  </div>
	  </div>
  </div>`;
}
// Split Title
function splitCardTitle(product) {
	let title = product.title.split(" ");
	let cardTitle = title.slice(0, 6).join(" ");
	if (title.length > 6) {
		cardTitle+= " ...";
	}
	return { cardTitle };
}
// Filter By Price
const filterForm = document.getElementById('filterForm');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');

filterForm.addEventListener('submit', function(event) {
    event.preventDefault();
    products.innerHTML="";
    data.forEach(product => {
        if (product.price>minPriceInput.value && product.price<maxPriceInput.value){
            products.innerHTML += loadProducts(product)
        }
    });

    
});
function getData() {
	return JSON.parse(localStorage.getItem("products"));
}