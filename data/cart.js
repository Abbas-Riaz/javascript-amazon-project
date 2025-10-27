
export let cart = JSON.parse(localStorage.getItem('cart'));
if (cart.length == 0) {

  cart = [{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 5,
    deliveryOptionId: '2',
  },
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: '3',
  }];

  console.log('null cart');
}




export function addToCart(productId) {

  const itemQuantity = parseInt(document.querySelector('.js-item-quantity').value);
  console.log(itemQuantity);
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += itemQuantity;
  }
  else {
    cart.push({
      productId: productId,
      quantity: itemQuantity,
    });
  }
  saveStorage();
}

export function removeCartItem(productId) {

  let newCart = [];
  cart.forEach((cartItem) => {


    if (cartItem.productId != productId) {
      newCart.push(cartItem)

    }
  });
  cart = newCart;
  saveStorage();

}


export function saveStorage() {

  localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateDeliveryOptions(productId, deliveryOptionId) {

  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }

  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveStorage();

}


