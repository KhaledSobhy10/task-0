import ProductsStore from "./store.js";
import { renderCart } from "./dropdown.js";
import createModal from "./modal.js";

// elements
const productsContainer =
  document.getElementsByClassName("products-container")[0];

// store
const productsStore = ProductsStore();

window.onload = function () {
  // subscribe to any change in products
  productsStore.subscribe((products, updatedProductsIDs) => {
    renderProducts(products, updatedProductsIDs);
    renderCart(products);
  });
  // hide spinner
  document.getElementById("products-spinner").classList.add("hide-opacity");
};

function renderProducts(products, updatedProductsIDs) {
  products.forEach((product, index) => {
    if (!productsContainer.children[index]) {
      productsContainer.appendChild(createProduct(product));
      return;
    }
    if (updatedProductsIDs?.includes(product.product_id)) {
      productsContainer.replaceChild(
        createProduct(product),
        productsContainer.children[index]
      );
    }
  });
}

function createProduct(product) {
  const productContainer = document.createElement("div");
  productContainer.classList.add("product");
  // img
  const img = document.createElement("img");
  img.src = product.product_image;
  productContainer.appendChild(img);
  // title
  const title = document.createElement("strong");
  title.textContent = product.product_name;
  title.classList.add("title", "one-line");
  productContainer.appendChild(title);

  // prices
  productContainer.appendChild(createPrices(product));

  //quick button
  productContainer.appendChild(createQuickButton(product));

  productContainer.appendChild(createActionButton(product));

  return productContainer;
}

function createPrices(product) {
  const prices = document.createElement("div");
  prices.classList.add("prices");

  const currentPrice = document.createElement("strong");
  currentPrice.textContent = "$" + product.product_price;
  currentPrice.classList.add("current");
  prices.appendChild(currentPrice);

  const discount = document.createElement("span");
  discount.textContent = `${product.product_discount}%`;
  discount.classList.add("discount");
  prices.appendChild(discount);

  const oldPrice = document.createElement("span");
  oldPrice.textContent = `$${Number.parseFloat(
    product.product_price / (1 - product.product_discount / 100)
  ).toFixed(2)}`;
  oldPrice.classList.add("old");
  prices.appendChild(oldPrice);
  return prices;
}

function createQuickButton(product) {
  const quickBtn = document.createElement("button");
  quickBtn.classList.add("btn", "action-btn", "quick-view");
  quickBtn.addEventListener("click", () => {
    createModal(product);
  });
  // eye icon
  const imgEye = document.createElement("img");
  imgEye.src = "./assets/images/eye-outline.svg";
  imgEye.width = "24";
  quickBtn.appendChild(imgEye);
  const quickBtnText = document.createTextNode("Quick view");
  quickBtn.appendChild(quickBtnText);
  return quickBtn;
}

function createActionButton(product) {
  // action button add/remove items
  const actionButton = document.createElement("button");
  actionButton.classList.add("btn", "action-btn");

  const iconBtn = document.createElement("img");
  let actionBtnText = "";
  if (product.added_to_cat) {
    iconBtn.src = "./assets/images/icon-delete.svg";
    actionBtnText = "Remove from cart";
    actionButton.addEventListener("click", function () {
      removeFromCart(product.product_id);
    });
  } else {
    iconBtn.src = "./assets/images/icon-cart-white.svg";
    actionBtnText = "Add to cart";
    actionButton.addEventListener("click", function () {
      addToCar(product.product_id);
    });
  }
  actionButton.appendChild(iconBtn);
  actionButton.appendChild(document.createTextNode(actionBtnText));
  return actionButton;
}

function addToCar(productId) {
  const currentProducts = productsStore.getProducts();
  const newProduct = currentProducts.find(
    ({ product_id }) => productId === product_id
  );
  if (newProduct) {
    newProduct.added_to_cat = true;
    productsStore.updateProduct(newProduct);
  }
}

export function removeFromCart(productId) {
  const currentProducts = productsStore.getProducts();
  const newProduct = currentProducts.find(
    ({ product_id }) => productId === product_id
  );
  if (newProduct) {
    newProduct.added_to_cat = false;
    productsStore.updateProduct(newProduct);
  }
}
