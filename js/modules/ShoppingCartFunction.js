class ShoppingCartFunction {
  constructor() {
    this.articleButtonsOrder = document.querySelectorAll(
      ".article-button-order"
    );
    this.shoppingCartMainContainer = document.querySelector(
      ".shopping-cart-main-container"
    );
    this.totalPriceHTML = document.querySelector(
      ".shopping-cart-total-price-quantity"
    );
    this.totalItemsCartHTML = document.querySelector(
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

    // 2. Crear el producto
    const product = { name, price, imgSrc };

    // 3. Agregar el producto al carrito
    cart.push(product);

    // 4. Guardar el carrito actualizado en localStorage
    localStorage.setItem("shoppingCart", JSON.stringify(cart));

    this.getTotalCartPrice(price, "sum");

    this.renderCartItem(product);

    this.getTotalItemsCart(cart);
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
    this.totalItemsCartHTML.innerHTML = cart.length;
    if (cart.length === 0) {
      this.totalItemsCartHTML.style.visibility = "hidden";
    } else {
      this.totalItemsCartHTML.style.visibility = "visible";
    }
  }

  getTotalCartPrice(price, operation) {
    if (operation == "sum") this.shoppingCartTotalPrice += +price;
    else if (operation == "subtract") this.shoppingCartTotalPrice -= +price;

    this.totalPriceHTML.innerHTML = `S/${this.shoppingCartTotalPrice}`;
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
        <div class="shopping-cart-item-image-overlay-delete">
          <i class="fa-solid fa-trash"></i>
        </div>
      </div>
      <h4 class="shopping-cart-item-name">${product.name}</h4>
      <p class="shopping-cart-item-price">S/${product.price}</p>
    `;

    // Agregar evento para eliminar
    cartItem
      .querySelector(".shopping-cart-item-image-container")
      .addEventListener("click", () => {
        this.removeFromShoppingCart(product, cartItem);
      });

    this.shoppingCartMainContainer.insertAdjacentElement(
      "afterbegin",
      cartItem
    );
  }

  removeFromShoppingCart(product, cartItemElement) {
    // 1. Obtener el carrito actual
    let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

    // 2. Buscar el índice del producto a eliminar (por nombre y precio)
    const index = cart.findIndex(
      (item) =>
        item.name === product.name &&
        item.price === product.price &&
        item.imgSrc === product.imgSrc
    );

    // 3. Eliminar del array si existe
    if (index !== -1) {
      cart.splice(index, 1);
      // 4. Actualizar localStorage
      localStorage.setItem("shoppingCart", JSON.stringify(cart));
      // 5. Eliminar del DOM
      cartItemElement.remove();
    }

    this.getTotalItemsCart(cart);
    this.getTotalCartPrice(product.price, "subtract");
  }
}

export default ShoppingCartFunction;
