const app = async function main() {
  // JS for button
  const button = window.document.querySelector("[rel=js-click-button]");

  button.addEventListener("click", () => {
    location.href = "checkout.html";
  });
};

export default app;
