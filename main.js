const Products = [
  { id: 1, name: "Product-1", price: 100 },
  { id: 2, name: "Product-2", price: 200 },
  { id: 3, name: "Product-3", price: 300 },
];
let amount = document.getElementById("total");
const cart = [];

function renderProductList() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  Products.forEach((product) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${product.name}  ${product.price}`;

    const addButton = document.createElement("button");
    addButton.textContent = "+";
    const val = document.createElement("span");
    val.textContent = "0";
    addButton.addEventListener("click", () => {
      addToCart(product);
      let newValue = parseInt(val.textContent);
      val.textContent = newValue + 1;
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "-";
    removeButton.addEventListener("click", () => {
      removeFromCart(product);
      let newValue = parseInt(val.textContent);
      if (newValue != 0) val.textContent = newValue - 1;
    });

    listItem.appendChild(addButton);
    listItem.appendChild(val);
    listItem.appendChild(removeButton);
    productList.appendChild(listItem);
  });
}
let total = 0;
function renderShoppingCart() {
  const cartMessage = document.getElementById("cart-message");
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartMessage.textContent = "No Product added to the cart";
  } else {
    cartMessage.textContent = "";
    cart.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${item.product.name} [ ${item.quantity} ] x ${item.product.price}`;
      cartList.appendChild(listItem);
    });
  }
}

function addToCart(product) {
  const existingItem = cart.find((item) => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity++;
    total += existingItem.product.price;
  } else {
    cart.push({ product, quantity: 1 });
    total += product.price;
  }
  amount.innerText = `Total: ${total}`;
  renderShoppingCart();
}

function removeFromCart(product) {
  const existingItem = cart.find((item) => item.product.id === product.id);

  if (existingItem) {
    if (existingItem.quantity > 1) {
      existingItem.quantity--;
      total -= existingItem.product.price;
      amount.innerText = `Total: ${total}`;
    } else {
      cart.splice(cart.indexOf(existingItem), 1);
      amount.innerText = " ";
    }
    renderShoppingCart();
  }
}

renderProductList();
renderShoppingCart();
