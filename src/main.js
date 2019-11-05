const runBundle = async function main() {
  // JS for button
  const button = window.document.querySelector("[rel=js-click-button]");

  button.addEventListener("click", () => {
    location.href = "checkout.html";
  });
};

runBundle();

// export default runBundle;
