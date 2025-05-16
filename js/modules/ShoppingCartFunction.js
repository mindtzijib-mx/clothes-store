class ShoppingCartFunction {
  constructor(openCartCallback) {
    this.openCartCallback = openCartCallback;
    this.articleButtonsOrder = document.querySelectorAll(
      ".article-button-order"
    );
    this.shoppingCartMainContainer = document.querySelector(
      ".shopping-cart-main-container"
    );
    this.totalPriceHTML = document.querySelector(
      ".shopping-cart-total-price-quantity"
    );
    this.totalItemsCartHTML = document.querySelectorAll(
      ".header-menu-shopping-cart__number"
    );
    this.shoppingCartTotalPrice = 0;
    this.totalItemsCart = 0;
    this.events();
    this.loadCartFromLocalStorage();
  }

  events() {
    this.articleButtonsOrder.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const article = button.closest(".article-item");
        this.addToShoppingCart(article);
      });
    });
  }

  addToShoppingCart(article) {
    const name = article.querySelector(".article-name").textContent;
    const priceText = article.querySelector(".article-price").textContent;
    const price = priceText.match(/[\d.]+/)[0];
    const imgSrc = article.querySelector(".article-item-img").src;

    // 1. Obtener el carrito actual del localStorage o crear uno nuevo
    let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

    // 2. Buscar si el producto ya existe
    const existingProduct = cart.find(
      (item) =>
        item.name === name && item.price === price && item.imgSrc === imgSrc
    );

    if (existingProduct) {
      // Si existe, aumentar la cantidad
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      // Si no existe, agregarlo con cantidad 1
      cart.push({ name, price, imgSrc, quantity: 1 });
    }

    // 3. Guardar el carrito actualizado en localStorage
    localStorage.setItem("shoppingCart", JSON.stringify(cart));

    this.renderCart(cart);
    this.getTotalItemsCart(cart);
    this.getTotalCartPrice();

    // Abre el carrito visualmente
    if (this.openCartCallback) {
      this.openCartCallback();
    }
  }

  renderCart(cart) {
    // Limpiar el contenedor
    this.shoppingCartMainContainer.innerHTML = "";
    this.shoppingCartTotalPrice = 0;

    cart.forEach((product) => {
      this.renderCartItem(product);
      this.shoppingCartTotalPrice +=
        product.quantity * parseFloat(product.price);
    });

    this.totalPriceHTML.innerHTML = `S/${this.shoppingCartTotalPrice.toFixed(
      2
    )}`;
  }

  loadCartFromLocalStorage() {
    const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    cart.forEach((product) => {
      this.renderCartItem(product);
      this.getTotalCartPrice(product.price, "sum");
    });

    this.getTotalItemsCart(cart);
  }

  getTotalItemsCart(cart) {
    this.totalItemsCartHTML.forEach((labelNumber) => {
      labelNumber.innerHTML = cart.length;
      if (cart.length === 0) {
        labelNumber.style.visibility = "hidden";
      } else {
        labelNumber.style.visibility = "visible";
      }
    });
  }

  getTotalCartPrice() {
    let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    let total = cart.reduce(
      (sum, item) => sum + (item.quantity || 1) * parseFloat(item.price),
      0
    );
    this.shoppingCartTotalPrice = total;
    this.totalPriceHTML.innerHTML = `S/${total.toFixed(2)}`;
  }

  renderCartItem(product) {
    // Crear el elemento del carrito
    const cartItem = document.createElement("article");
    cartItem.classList.add("shopping-cart-item");
    cartItem.innerHTML = `
      <div class="shopping-cart-item-image-container">
        <img
          src="${product.imgSrc}"
          alt=""
          class="shopping-cart-item-img"
        />
      </div>
      <div class="shopping-cart-item-main">
        <h4 class="shopping-cart-item-name">${product.name}</h4>
        <p class="shopping-cart-item-quantity">Cantidad: ${
          product.quantity || 1
        }</p>
      </div>
      <div class="shopping-cart-item-price-delete">
          <p class="shopping-cart-item-price">S/${product.price}</p>
          <div class="shopping-cart-item-delete">
            <i class="fa-solid fa-trash"></i>
          </div>          
      </div>      
    `;

    // Agregar evento para eliminar
    cartItem
      .querySelector(".shopping-cart-item-delete")
      .addEventListener("click", () => {
        this.removeFromShoppingCart(product, cartItem);
      });

    this.shoppingCartMainContainer.insertAdjacentElement(
      "afterbegin",
      cartItem
    );
  }

  removeFromShoppingCart(productToRemove) {
    let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    const index = cart.findIndex(
      (item) =>
        item.name === productToRemove.name &&
        item.price === productToRemove.price &&
        item.imgSrc === productToRemove.imgSrc
    );

    if (index !== -1) {
      if ((cart[index].quantity || 1) > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
      localStorage.setItem("shoppingCart", JSON.stringify(cart));
      this.renderCart(cart);
      this.getTotalItemsCart(cart);
      this.getTotalCartPrice();
    }
  }
}

export default ShoppingCartFunction;
