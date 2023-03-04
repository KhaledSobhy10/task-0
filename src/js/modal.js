const modalWrapper = document.getElementsByClassName("modal-wrapper")[0];

function createModal(product) {
  document.body.classList.add("overflow-hidden");
  modalWrapper.classList.remove("hide-opacity");
  const closeBtn = document.getElementsByClassName("close-modal-btn")[0];
  const quickImage = document.getElementById("quick-image");
  const quickTitle = document.getElementById("quick-title");
  const quickCurrentPrice = document.getElementById("quick-current-price");
  const quickDiscount = document.getElementById("quick-discount");
  const quickOldPrice = document.getElementById("quick-old-price");

  quickCurrentPrice.textContent = "$" + product.product_price;
  quickDiscount.textContent = `${product.product_discount}%`;
  quickOldPrice.textContent = `$${Number.parseFloat(
    product.product_price / (1 - product.product_discount / 100)
  ).toFixed(2)}`;
  quickTitle.textContent = product.product_name;

  quickImage.src = product.product_image;

  closeBtn.addEventListener("click", function () {
    closeModal();
  });
}

function closeModal() {
  document.body.classList.remove("overflow-hidden");
  modalWrapper.classList.add("hide-opacity");
}
