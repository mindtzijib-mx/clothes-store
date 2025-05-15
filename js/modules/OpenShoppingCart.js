class OpenShoppingCart {
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
    this.addClickListener(this.shoppingCartIcon, this.toggleMenu.bind(this));
    this.addClickListener(
      this.shoppingCartIconBack,
      this.toggleMenu.bind(this)
    );
    this.addClickListener(this.overlay, this.toggleMenu.bind(this));
  }

  // To avoid DRY
  addClickListener(element, callback) {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      callback();
    });
  }

  toggleMenu() {
    this.shoppingCart.classList.toggle("shopping-cart-open");
    this.overlay.classList.toggle("hidden");
  }
}

export default OpenShoppingCart;
