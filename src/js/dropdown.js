import { removeFromCart } from "./index.js";

const cartDropDownBtn = document.getElementById("cart-drop-down_btn");
const cartDropDownContent = document.getElementById("cart-drop-down_content");
// handle cart clicked
cartDropDownBtn.addEventListener("click", function (event) {
  event.stopPropagation();
  cartDropDownContent.classList.toggle("show");
});

// Close the cart dropdown  if the user clicks outside of it
window.onclick = function (event) {
  if (event.target === cartDropDownBtn) return;
  if (cartDropDownContent.classList.contains("show"))
    cartDropDownContent.classList.remove("show");
};

export function renderCart(products) {
  const productsInCart = products.filter(({ added_to_cat }) => added_to_cat);
  const items = document.getElementById("cart-drop-down_content");
  const checkoutBtn = document.getElementById("checkout-btn");
  document.getElementById("cart-drop-down_total").textContent =
    productsInCart.length;

  items.innerHTML = "";

  productsInCart.forEach((product) => {
    items.appendChild(createItemInCart(product));
  });

  if (items.children.length === 0) {
    items.textContent = "Empty cart !!";
    checkoutBtn.classList.add("hide");
  } else checkoutBtn.classList.remove("hide");
}

function createItemInCart(product) {
  // item in list
  const element = document.createElement("li");
  element.setAttribute("product_id", product.product_id);

  const item = document.createElement("div");
  item.classList.add("item-in-cart");

  // thumbnail
  const img = document.createElement("img");
  img.classList.add("small-thumbnail");
  img.src = product.product_thumbnail;
  item.appendChild(img);

  //info p strong
  const info = document.createElement("div");
  info.classList.add("info");
  const title = document.createElement("p");
  title.textContent = product.product_name;
  info.appendChild(title);
  const price = document.createElement("strong");
  price.textContent = "$" + product.product_price;
  info.appendChild(price);
  item.appendChild(info);

  //button delete
  const deleteBtn = document.createElement("button");
  deleteBtn.addEventListener("click", () => {
    removeFromCart(product.product_id);
  });
  deleteBtn.classList.add("btn");
  const imgDelete = document.createElement("img");
  imgDelete.src = "./images/icon-delete.svg";
  deleteBtn.appendChild(imgDelete);
  item.appendChild(deleteBtn);
  element.appendChild(item);
  return element;
}
