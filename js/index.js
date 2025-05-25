import OpenMobileMenu from "./modules/OpenMobileMenu.js";
import openModal from "./modules/OpenModal.js";
import OpenShoppingCart from "./modules/OpenShoppingCart.js";
import ShoppingCartFunction from "./modules/ShoppingCartFunction.js";
import sliderCategories from "./modules/SliderCategories.js";
import showProductsBySubcategory from "./modules/showProductsBySubcategory.js";
import showSubcategories from "./modules/showSubcategories.js";

const openShoppingCart = new OpenShoppingCart();
const shoppingCartFunction = new ShoppingCartFunction(
  openShoppingCart.openCart.bind(openShoppingCart)
);

sliderCategories();
showSubcategories();
openModal(shoppingCartFunction);
showProductsBySubcategory();
OpenMobileMenu();
