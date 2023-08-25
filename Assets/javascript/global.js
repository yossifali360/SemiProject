// Change currency
const cartCtn = document.querySelector(".cartCtn")
removeDivOnSmallScreens();
const productCards = document.querySelectorAll(".productCard");
const currency = document.getElementById("currency");
console.log(document.getElementById("currency"));
const originalPrices = [];
productCards.forEach(product => {
    const priceElement = product.querySelector(".price");
    originalPrices.push(priceElement.textContent);

});
currency.addEventListener("change", function() {
    if (currency.value == "Egy") {
        productCards.forEach((product, index) => {
            const priceElement = product.querySelector(".price");
            const priceSign = product.querySelector(".priceSign");
            priceSign.textContent = " EGP";
            priceElement.textContent = originalPrices[index];
        });
    }
    
    if (currency.value == "dolar") {
        productCards.forEach((product, index) => {
            const priceElement = product.querySelector(".price");
            const priceSign = product.querySelector(".priceSign");
            priceSign.textContent = " $";
            const originalPrice = originalPrices[index];
            let newPrice = originalPrice / 30.84;
            priceElement.textContent = newPrice.toFixed(2);
        });
    }
    if (currency.value == "Euro") {
        productCards.forEach((product, index) => {
            const priceElement = product.querySelector(".price");
            const priceSign = product.querySelector(".priceSign");
            priceSign.textContent = " €";
            const originalPrice = originalPrices[index];
            let newPrice = originalPrice / 33.59;
            priceElement.textContent = newPrice.toFixed(2);
        });
    }
    if (currency.value == "CAD") {
        productCards.forEach((product, index) => {
            const priceElement = product.querySelector(".price");
            const priceSign = product.querySelector(".priceSign");
            priceSign.textContent = " c$";
            const originalPrice = originalPrices[index];
            let newPrice = originalPrice / 22.73;
            priceElement.textContent = newPrice.toFixed(2);
        });
    }
});
// check login
const menu = document.querySelector(".menu")
const userName = document.querySelector(".userName")
const navbarDropdown = document.getElementById("navbarDropdown");
const logout = document.querySelector(".logout")
function getSessionData() {
	return JSON.parse(localStorage.getItem("session"));
}
function checkLogin(){
    if(getSessionData() != null){
		if(getSessionData().Role == "Admin"){
			userName.textContent = "Welcome" + " " + getSessionData().fName + " " + "(Admin)"
		}
		else{
			userName.textContent = getSessionData().fName + " " + getSessionData().lName
		}
		userName.setAttribute("href", "#");
		menu.setAttribute("data-bs-toggle", "dropdown");
		userName.style.cursor="default"
		navbarDropdown.style.cursor="pointer"
    }

}
checkLogin();
// Logout
logout.addEventListener("click",function(){
	localStorage.removeItem("session");
	location.reload();
})
const userIcon = document.querySelector(".userImg");
const userImg = document.querySelector(".userImg img");

if (getSessionData().imageSrc !== ""){
	userImg.style.display="block"
	userImg.src = getSessionData().imageSrc;
    userIcon.classList.remove("fa-user","bg-dark","p-2")
}
// Add To Cart 
const cart = JSON.parse(localStorage.getItem("cart")) ?? [];
const addToCartBtn = document.querySelectorAll(".addToCart");
const totalCartsPrice = document.querySelector(".totalCartsPrice")
let totalPrice = 0;
addToCart(addToCartBtn);
// Function Add To Cart
function addToCart(x) {
	x.forEach((btn) => {
		btn.addEventListener("click", () => {
            const parent = btn.closest(".productCard");
			let productId = parent.dataset.id;
			let productObject = getData().find(
				(product) => product.id == productId
			);
			let searchProduct = cart.find((product) => product.id == productId);
			success(productObject.images[0], productObject.title);
			if (searchProduct == undefined) {
				cart.push({ ...productObject, quantity: 1 });
			} else {
				searchProduct.quantity++;
			}
			localStorage.setItem("cart", JSON.stringify(cart));
			cartCount.textContent=cart.length;
		});
	});
}
// Function Success (Add to card)
function success(url, tests) {
	const Toast = Swal.mixin({
		toast: true,
		position: "top-right",
		iconColor: "white",
		customClass: {
			popup: "colored-toast",
		},
		showConfirmButton: true,
		confirmButtonText: "Close",
		imageUrl: url,
		imageWidth: 300,
		imageHeight: 150,
		imageAlt: "Custom image",
		timer: 3500,
		timerProgressBar: true,
		closeOnEsc: true,
	});
	Toast.fire({
		icon: "success",
		title: `<span><h5 class="text-primary">${tests}</h5> <br> Added To Cart Successfuly <br> </span>`,
	});
}
// Cart Count
const cartCount = document.querySelector(".cartCount");
const carts = document.querySelector(".carts")

if (cart.length == 0){
	cartCount.style.display="none"
}
else{
	cartCount.style.display="block"
	cartCount.textContent=cart.length
}
cart.forEach(element => {
	carts.innerHTML += cardItemData(element)
	totalPrice += (element.quantity * element.price)
});
totalCartsPrice.textContent=totalPrice.toLocaleString('en-US')
function cardItemData(cart){
	return `<div class="cartItem px-3">
	<div class="d-flex align-items-center justify-content-between">
	  <img src="${cart.images[0]}" alt="Product img" class="rounded-2">
	  <div class="cartText px-3">
		<h4>${cart.title}</h4>
	  </div>
	  <span class="text-muted">${cart.quantity}X</span>
	  <div class="price px-3">${cart.price.toLocaleString('en-US')}EGP</div>
	</div>
	<hr>
  </div>`
}
function getData() {
	return JSON.parse(localStorage.getItem("products"));
}

// Products Icons
const productCtn = document.querySelector(".productCtn");
const loadingIcon = document.querySelector(".loadingIcon");
const viewIcons = document.querySelectorAll(".viewIcon");
const heartIcons = document.querySelectorAll(".heartIcon");
// View Icons
viewIcons.forEach((icon) => {
	const parent = icon.closest(".productCard")
	const hiddenVeiw = parent.querySelector(".hiddenVeiw");
	viewIconHover(icon,hiddenVeiw);
	icon.addEventListener("click", function () {
		const productId = icon.closest(".productCard").dataset.id;
		let productObject = getData().find((product) => product.id == productId);
		loadingIcon.style.display = "block";
		setTimeout(() => {
			loadingIcon.style.display = "none";
			const productOverlay = document.createElement("div");
			productOverlay.classList.add("productOverlay");
			productOverlay.innerHTML = productDetails(productObject);
			productCtn.appendChild(productOverlay);
			productOverlay.style.display = "block";
			viewProductActiveImg(productOverlay)
			const addToCartOverlayBtn = document.querySelectorAll(".addToCartOverlayBtn")
			addToCart(addToCartOverlayBtn)
			const closeProduct = productOverlay.querySelector(".closeProduct");
			closeProduct.addEventListener("click", function () {
				productOverlay.style.display = "none";
			});
		}, 2000);
	});
});
// Heart Icons
heartIcons.forEach((icon) => {
	const parent = icon.closest(".productCard")
	const hiddenHeart = parent.querySelector(".hiddenHeart");
	viewIconHover(icon,hiddenHeart);
	icon.addEventListener("click", function () {
		const iconCtn = icon.closest(".cardIcons");
		const view = iconCtn.querySelector(".viewIcon");
		heartClick(icon)
		view.style.display = "none";
		iconCtn.style.backgroundColor = "transparent";
		hiddenHeart.textContent="Added To Wishlist"
		setTimeout(() => {
			heartClickRemove(icon)
			iconCtn.style.backgroundColor = "#fff";
			view.style.display = "block";
		}, 2900);
	});
});
// Heart Click
function heartClick(icon){
	icon.classList.remove("fa-regular");
	icon.classList.add("fa-solid");
	icon.style.color = "red";
	icon.style.backgroundColor = "transparent";
	icon.style.position = "absolute";
	icon.style.animation = "move 3s";
	icon.classList.add("fs-1");
}
// Heart Click Remove
function heartClickRemove(icon){
	icon.style.color = "red";
	icon.classList.remove("fs-1");
	icon.classList.add("fs-5");
	icon.classList.add("fa-regular");
	icon.style.position = "relative";
}
// View Icon Hover
function viewIconHover(icon,hidden){
	icon.addEventListener("mouseover", function () {
		hidden.style.visibility = "visible";
	});
	icon.addEventListener("mouseout", function () {
		hidden.style.visibility = "hidden";
	});
}
// Products Details (Overlay)
function productDetails(product) {
    let images = "";
    product.images.forEach(imageUrl => {
        images += `<div class="p-1 rounded-2 m-1"><img class="pImage" src="${imageUrl}"></div>`;
    });
	return `<div class = "container d-flex align-items-center justify-content-center overlay h-100">
	<div class = "d-flex flex-column flex-lg-row bg-white rounded-2 w-100 p-4 ProductCtn productCard" data-id="${product.id}">
		<div class = "left p-3 w-75 h-100">
            <div class="h-100 d-flex flex-column justify-content-between">
                <div class="h-50">
                    <img src = "${product.images[0]}" alt = "Product Image" class="w-75 h-100 d-block m-auto rounded-2 mainImg">
                </div>
                <div class="hover-container d-flex flex-wrap align-items-center justify-content-center mt-2">
                ${images}  
                </div>
            </div>
		</div>
		<div class = "right w-50 p-3 h-100">
			<div class="h-100 d-flex flex-column justify-content-between">
				<span class = "product-name d-block">${product.title}</span>
				<h3 class = "d-block text-muted fs-4"> Price: ${product.price} EGP</h3>
				<h3 class = "d-block text-muted fs-4">Category ${product.category}</h3>
				<h3 class = "d-block text-muted fs-4">Brand: ${product.Brand}</h3>
				<div class = "product-rating mt-2">
					<span class="ms-1"><i class = "fas fa-star"></i></span>
					<span class="ms-1"><i class = "fas fa-star"></i></span>
					<span class="ms-1"><i class = "fas fa-star"></i></span>
					<span class="ms-1"><i class = "fas fa-star"></i></span>
					<span class="ms-1"><i class = "fas fa-star"></i></span>
				</div>
				<div class = "mt-2 d-flex flex-column flex-lg-row gap-2">
					<button class = "btn btn-outline-primary p-2 text-capitalize addToCartOverlayBtn"><i class = "fas fa-shopping-cart p-2"></i>add to cart</button>
					<button class = "btn btn-outline-info p-2 text-capitalize"><i class = "fas fa-wallet p-2"></i>buy now</button>
				</div>
          </div>
		</div>
	</div>
</div>
<a id="closeProduct" class="fas fa-x closeProduct"></a>`;
}
// Add Acive Class To Images
function viewProductActiveImg(productOverlay) {
	const productViewMainImg = productOverlay.querySelector(".mainImg");
	const productViewImages = productOverlay.querySelectorAll(".pImage");
	productViewImages.forEach((item) => {
		item.addEventListener("click", function () {
			productViewMainImg.src = item.src;
			removeActive(productViewImages);
			item.classList.add("active");
		});
	});
}
// Remove Active Class From Images
function removeActive(imgs) {
	imgs.forEach(function (item) {
		item.classList.remove("active");
	});
}
// Shopping Cart
const shopppingCart = document.querySelector(".shopppingCart")
const details = shopppingCart.querySelector(".details")
const shoppingCartIcon = document.querySelector(".shoppingCartIcon")
const closeCart = document.querySelector(".closeCart")

console.log(document.querySelector(".shoppingCartIcon"));
shoppingCartIcon.addEventListener("click",function(){
	shopppingCart.classList.remove("d-none")
	shopppingCart.classList.add("d-block")
	setTimeout(() => {
		details.style.right="0"
	}, 100);
})

closeCart.addEventListener("click",function(){
	details.style.right="-700px"
	setTimeout(() => {
		shopppingCart.classList.add("d-none")
	}, 600);
	
}) 
function removeDivOnSmallScreens() {
    if (window.innerWidth <= 992) {
        cartCtn.remove();
    }
}



