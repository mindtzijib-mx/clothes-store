export default function sliderCategories() {
  const container = document.querySelector(".categories-container");
  let isDown = false;
  let startX;
  let scrollLeft;

  // Para PC
  container.addEventListener("mousedown", (e) => {
    isDown = true;
    container.classList.add("active");
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });

  container.addEventListener("mouseleave", () => (isDown = false));
  container.addEventListener("mouseup", () => (isDown = false));

  container.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  });
}
