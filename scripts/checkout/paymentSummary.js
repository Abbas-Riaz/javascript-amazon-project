import { cart } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOption.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
export function paymentSummaryHtml() {
  let totalItemsPrice = 0;
  let shippingFee = 0;
  let totalBeforeTax = 0;
  let totalAfterTax = 0;
  cart.forEach((cartProduct) => {

    deliveryOptions.forEach((deliveryOption) => {
      if (cartProduct.deliveryOptionId === deliveryOption.id) {
        shippingFee += deliveryOption.priceCents
      }
    });
    products.forEach((product) => {
      if (cartProduct.productId === product.id) {
        console.log("cart is ", cartProduct.productId);
        totalItemsPrice += (product.priceCents * cartProduct.quantity);
        // console.log('hello');
      }
    });
  });

  let totalTax = formatCurrency(totalItemsPrice * 0.1);
  totalAfterTax = formatCurrency((totalItemsPrice * 0.1) + totalItemsPrice + shippingFee);
  totalBeforeTax = formatCurrency(totalItemsPrice + shippingFee);
  totalItemsPrice = formatCurrency(totalItemsPrice);
  shippingFee = formatCurrency(shippingFee);


  console.log(totalItemsPrice);
  document.querySelector('.js-payment-summary').innerHTML = `
      
        <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (3):</div>
          <div class="payment-summary-money">$${totalItemsPrice}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${shippingFee}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${totalBeforeTax}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${totalTax}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${totalAfterTax}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
      
      `

}





