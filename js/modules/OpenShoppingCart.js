class OpenShoppingCart {
  constructor() {
    this.shoppingCartIcon = document.querySelectorAll(
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
    this.shoppingCartIcon.forEach((icon) => {
      this.addClickListener(icon, this.toggleMenu.bind(this));
    });
    this.addClickListener(
      this.shoppingCartIconBack,
      this.toggleMenu.bind(this)
    );
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
  }

  openCart() {
    this.shoppingCart.classList.add("shopping-cart-open");
  }
}

export default OpenShoppingCart;
