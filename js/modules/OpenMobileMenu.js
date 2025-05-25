export default function OpenMobileMenu() {
  document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuButton = document.querySelector(".header-menu-mobile");
    const mainNav = document.querySelector(".main-nav");

    // Alternar la clase "active" al hacer clic en el botón hamburguesa
    mobileMenuButton.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });

    // Opcional: Cerrar el menú al hacer clic en un enlace
    mainNav.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        mainNav.classList.remove("active");
      }
    });
  });
}
