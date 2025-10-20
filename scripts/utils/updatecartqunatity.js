import { cart } from "../../data/cart.js";
export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach(item => {
    cartQuantity += item.quantity;
  });

  const cartElement = document.querySelector('.js-cart-quantity');
  if (cartElement) {
    cartElement.innerHTML = cartQuantity;
  }


  console.log(cart);
}