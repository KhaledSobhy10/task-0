// our store

export default function ProductsStore() {
  let products = getProductsFromLocalStorage() || [
    {
      product_id: 1,
      product_name: "Limited Edition Sneakers",
      product_price: 120,
      product_discount: 50,
      product_image: "./images/image-product-1.jpg",
      added_to_cat: false,
      product_thumbnail: "./images/image-product-1-thumbnail.jpg",
    },
    {
      product_id: 2,
      product_name: "Fall  Edition Sneakers",
      product_price: 150,
      product_discount: 10,
      product_image: "./images/image-product-2.jpg",
      added_to_cat: false,
      product_thumbnail: "./images/image-product-2-thumbnail.jpg",
    },
    {
      product_id: 3,
      product_name: "Fall Pro Edition Sneakers",
      product_price: 190,
      product_discount: 50,
      product_image: "./images/image-product-3.jpg",
      added_to_cat: true,
      product_thumbnail: "./images/image-product-3-thumbnail.jpg",
    },
    {
      product_id: 4,
      product_name: "Advance Edition Sneakers",
      product_price: 120,
      product_discount: 30,
      product_image: "./images/image-product-4.jpg",
      product_thumbnail: "./images/image-product-4-thumbnail.jpg",
      added_to_cat: false,
    },
    {
      product_id: 5,
      product_name: "Fall Edition Sneakers",
      product_price: 150,
      product_discount: 10,
      product_image: "./images/image-product-2.jpg",
      added_to_cat: false,
      product_thumbnail: "./images/image-product-2-thumbnail.jpg",
    },
    {
      product_id: 6,
      product_name: "Fall Pro Edition Sneakers",
      product_price: 190,
      product_discount: 70,
      product_image: "./images/image-product-3.jpg",
      product_thumbnail: "./images/image-product-3-thumbnail.jpg",

      added_to_cat: true,
    },
  ];

  const subscribers = [];

  function subscribe(callback) {
    subscribers.push(callback);
    callback([...products], null);
  }

  function setProducts(newProducts) {
    products = newProducts;
    subscribers.forEach((subscriber) => subscriber(products));
    setProductsToLocalStorage(products);
  }

  function getProducts() {
    return [...products];
  }

  function updateProduct(product) {
    const index = products.findIndex(
      ({ product_id }) => product.product_id === product_id
    );
    products[index] = product;
    subscribers.forEach((subscriber) =>
      subscriber(products, [product.product_id])
    );
    setProductsToLocalStorage(products);
  }

  return { subscribe, getProducts, updateProduct };
}

function getProductsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("products"));
}

function setProductsToLocalStorage(products) {
  localStorage.setItem("products", JSON.stringify(products));
}
