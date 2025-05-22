import { products, renderProducts } from "./productsData.js";

export default function showProductsBySubcategory() {
  // Mostrar todos los productos al inicio
  renderProducts(products);

  // Delegación de eventos para subcategorías
  document
    .querySelector(".subcategories-container")
    .addEventListener("click", (e) => {
      const target = e.target;
      if (target.classList.contains("subcategory-item")) {
        const subcat = target.textContent.trim();
        const filtered = products.filter((p) => p.subcategory === subcat);
        renderProducts(filtered);
      }
    });

  // Evento para categoría "Todos"
  document.querySelectorAll(".category-item").forEach((item) => {
    item.addEventListener("click", () => {
      const title = item.querySelector(".category-title");
      if (title && title.textContent.trim() === "Todos") {
        renderProducts(products);
      }
    });
  });
}
