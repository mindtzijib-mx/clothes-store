class ShoppingCart {
  constructor() {
    this.shoppingCartIcon = document.querySelector(
      ".header-menu-shopping-cart"
    );
    this.shoppingCartIconBack = document.querySelector(
      ".shopping-cart-header-container-back"
    );
    this.overlay = document.querySelector(".overlay");
    this.shoppingCart = document.querySelector(".shopping-cart");
    this.body = document.querySelector("body");
    this.events();
  }

  events() {
    this.shoppingCartIcon.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggleMenu();
    });
    this.shoppingCartIconBack.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggleMenu();
    });
    this.overlay.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggleMenu();
    });
  }

  toggleMenu() {
    this.shoppingCart.classList.toggle("shopping-cart-open");
    this.overlay.classList.toggle("hidden");
  }
}

export default ShoppingCart;
