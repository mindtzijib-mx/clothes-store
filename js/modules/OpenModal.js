// Supón que ya tienes una instancia global de shoppingCartFunction
// Si no, pásala como parámetro o usa un singleton

export default function openModal(shoppingCartFunctionInstance) {
  const modal = document.getElementById("product-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalPrice = document.getElementById("modal-price");
  const modalDescription = document.getElementById("modal-description");
  const closeBtn = document.querySelector(".modal-close");
  const addToCartBtn = document.querySelector(".modal-button-order");

  // Cerrar modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // Abrir modal con detalles

  const articlesContainer = document.querySelector(".articles-container");

  if (articlesContainer) {
    articlesContainer.addEventListener("click", (e) => {
      const item = e.target.closest(".article-item");
      // Evita abrir el modal si se hace click en el botón de agregar al carrito
      if (item && !e.target.classList.contains("article-button-order")) {
        const img = item.querySelector(".article-item-img");
        const name = item.querySelector(".article-name");
        const price = item.querySelector(".article-price");
        const desc = item.querySelector(".article-description");

        modalImg.src = img ? img.src : "";
        modalTitle.textContent = name ? name.textContent : "";
        modalPrice.textContent = price ? price.textContent : "";
        modalDescription.textContent = desc ? desc.textContent : "";

        // Guardar referencia al producto actual en el modal
        modal.dataset.img = img ? img.src : "";
        modal.dataset.name = name ? name.textContent : "";
        modal.dataset.price = price ? price.textContent : "";
        modal.dataset.desc = desc ? desc.textContent : "";

        modal.style.display = "flex";
      }
    });
  }

  // Agregar al carrito desde el modal
  addToCartBtn.addEventListener("click", () => {
    // Crea un objeto similar a un .article-item para reutilizar la función
    const articleModal = document.createElement("div");
    articleModal.innerHTML = `
      <img class="article-item-img" src="${modal.dataset.img}">
      <h4 class="article-name">${modal.dataset.name}</h4>
      <p class="article-price">${modal.dataset.price}</p>
      <p class="article-description" style="display:none;">${modal.dataset.desc}</p>
    `;

    shoppingCartFunctionInstance.addToShoppingCart(articleModal);

    // Opcional: cerrar el modal después de agregar
    modal.style.display = "none";
  });
}
