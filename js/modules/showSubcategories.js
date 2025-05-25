// Datos de categorías con sus subcategorías
const categoriesData = {
  Etiquetas: {
    subcategories: ["Tejidas", "Impresas", "Bordadas"],
    image: "https://cdn-icons-png.flaticon.com/512/1291/1291389.png",
  },
  Cintas: {
    subcategories: ["Satinada", "Grosgrain", "Algodón"],
    image: "https://cdn-icons-png.flaticon.com/512/1291/1291389.png",
  },
  Hangtag: {
    subcategories: ["Cartón", "Plástico"],
    image: "https://cdn-icons-png.flaticon.com/512/1291/1291389.png",
  },
  Cueros: {
    subcategories: ["Natural", "Sintético"],
    image: "https://cdn-icons-png.flaticon.com/512/1291/1291389.png",
  },
  Placas: {
    subcategories: ["Metálicas", "Plásticas"],
    image: "https://cdn-icons-png.flaticon.com/512/1291/1291389.png",
  },
  Plastisol: {
    subcategories: ["Transfer", "Directo"],
    image: "https://cdn-icons-png.flaticon.com/512/1291/1291389.png",
  },
  "Bolsas de Papel": {
    subcategories: ["Kraft", "Blanca"],
    image: "https://cdn-icons-png.flaticon.com/512/1291/1291389.png",
  },
  "Bolsas plásticas": {
    subcategories: ["Transparente", "Color"],
    image: "https://cdn-icons-png.flaticon.com/512/1291/1291389.png",
  },
  "Cajas publicitarias": {
    subcategories: ["Pequeña", "Grande"],
    image: "https://cdn-icons-png.flaticon.com/512/1291/1291389.png",
  },
  Adhesivos: {
    subcategories: ["Vinilo", "Papel"],
    image: "https://cdn-icons-png.flaticon.com/512/1291/1291389.png",
  },
};

function renderCategories(container) {
  // Primero creamos el HTML para "Todos"
  const allCategoryHTML = `
    <article class="category-item">
      <img src="https://cdn-icons-png.flaticon.com/512/1291/1291389.png" alt="Todos" class="category-img">
      <h3 class="category-title">Todos</h3>
    </article>
  `;

  // Luego generamos el HTML para el resto de categorías
  const categoriesHTML = Object.entries(categoriesData)
    .map(
      ([category, data]) => `
      <article class="category-item">
        <img src="${data.image}" alt="${category}" class="category-img">
        <h3 class="category-title">${category}</h3>
      </article>
    `
    )
    .join("");

  // Combinamos "Todos" con el resto de categorías
  container.innerHTML = allCategoryHTML + categoriesHTML;

  // Seleccionamos "Todos" por defecto
  container
    .querySelector(".category-item")
    .classList.add("category-item-selected");
}

export default function showSubcategories() {
  const categoriesContainer = document.querySelector(".categories-container");
  const subcategoriesContainer = document.querySelector(
    ".subcategories-container"
  );

  // Renderizar categorías
  renderCategories(categoriesContainer);

  // Delegación de eventos para las categorías
  categoriesContainer.addEventListener("click", (e) => {
    const categoryItem = e.target.closest(".category-item");
    if (!categoryItem) return;

    // Quitar selección previa
    document.querySelectorAll(".category-item").forEach((item) => {
      item.classList.remove("category-item-selected");
    });
    categoryItem.classList.add("category-item-selected");

    // Obtener el nombre de la categoría y sus subcategorías
    const categoryName =
      categoryItem.querySelector(".category-title").textContent;
    const subcategories = categoriesData[categoryName]?.subcategories || [];

    // Renderizar subcategorías
    subcategoriesContainer.innerHTML = subcategories
      .map((sub) => `<article class="subcategory-item">${sub}</article>`)
      .join("");
  });
}
