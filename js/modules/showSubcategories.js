// Define tus subcategorías por nombre de categoría
const subcategoriesData = {
  Etiquetas: ["Tejidas", "Impresas", "Bordadas"],
  Cintas: ["Satinada", "Grosgrain", "Algodón"],
  Hangtag: ["Cartón", "Plástico"],
  Cueros: ["Natural", "Sintético"],
  Placas: ["Metálicas", "Plásticas"],
  Plastisol: ["Transfer", "Directo"],
  "Bolsas de Papel": ["Kraft", "Blanca"],
  "Bolsas plásticas": ["Transparente", "Color"],
  "Cajas publicitarias": ["Pequeña", "Grande"],
  Adhesivos: ["Vinilo", "Papel"],
  // Agrega más según tus necesidades
};

export default function showSubcategories() {
  const categoryItems = document.querySelectorAll(".category-item");
  const subcategoriesContainer = document.querySelector(
    ".subcategories-container"
  );

  categoryItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Quitar selección previa
      categoryItems.forEach((i) =>
        i.classList.remove("category-item-selected")
      );
      item.classList.add("category-item-selected");

      // Obtener el nombre de la categoría
      const title = item.querySelector(".category-title");
      if (!title) return;
      const categoryName = title.textContent.trim();

      // Obtener subcategorías
      const subcategories = subcategoriesData[categoryName] || [];

      // Mostrar subcategorías
      if (subcategories.length > 0) {
        subcategoriesContainer.innerHTML = subcategories
          .map((sub) => `<article class="subcategory-item">${sub}</article>`)
          .join("");
      } else {
        subcategoriesContainer.innerHTML = "";
      }
    });
  });
}
