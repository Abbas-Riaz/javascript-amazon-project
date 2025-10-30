import { cart, removeCartItem, updateDeliveryOptions, } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { updateCartQuantity } from '../utils/updatecartqunatity.js';
import { deliveryOptions } from '../../data/deliveryOption.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { paymentSummaryHtml } from './paymentSummary.js';


export function orderSummaryHtml() {
  let cartSummaryHtml = '';
  let deliveryOption = 0;

  cart.forEach((cartItem) => {
    let productId = cartItem.productId;
    let matchingProduct;
    products.forEach(product => {

      if (productId === product.id) {
        matchingProduct = product;
        // console.log(product);
        // console.log('hello cart');
      }


      const deliveryOptionId = cartItem.deliveryOptionId;

      //  print ( console.log ( console.readline   ( "hello world")))

      deliveryOptions.forEach((Option) => {

        if (deliveryOptionId === Option.id) {

          deliveryOption = Option;
        }

      });
    });

    let todayDate = dayjs();
    let deliveryDate = todayDate.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd , MMMM  D');
    cartSummaryHtml += `
      <div class="cart-item-container  js-containere-${matchingProduct.id}">
              <div class="delivery-date js-delivery-${matchingProduct.id}">
                Delivery Date : ${dateString};
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    ${(formatCurrency(matchingProduct.priceCents))}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary  js-update-link js-update-${matchingProduct.id}"  data-product-id="${matchingProduct.id}" >
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                    ${deliveryOptionsHtml(matchingProduct, cartItem)}
                  </div>
                  
                  
                
                </div>
              </div>
            </div>
      
      `;
  });

  function deliveryOptionsHtml(matchingProduct, cartItem) {


    let html = ``;
    deliveryOptions.forEach((deliveryOption) => {



      let todayDate = dayjs();
      let deliveryDate = todayDate.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd , MMMM  D');

      const priceString = deliveryOption.priceCents === 0
        ?
        'Free' : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

  


      html += `
        <div class="delivery-option  js-delivery-option"
        data-product-id = "${matchingProduct.id}"
        data-delivery-option-id = "${deliveryOption.id}">
          <input type="radio" ${isChecked ? "checked" : ''}  class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
        `

    });
    return html;
  }



  updateCartQuantity();
  console.log(cartSummaryHtml);
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

  document.querySelectorAll('.js-delete-link').forEach((link) => {

    link.addEventListener('click', () => {
      let productId = link.dataset.productId;
      removeCartItem(productId);
      updateCartQuantity();

      document.querySelector(`.js-containere-${productId}`).remove();

    })

  });


  document.querySelectorAll('.js-update-link').forEach((link) => {

    link.addEventListener('click', () => {

      let productId = link.dataset.productId;



      console.log('DELETE', productId);

    })
  })


  document.querySelectorAll('.js-delivery-option').forEach((element) => {

    element.addEventListener('click', () => {

      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOptions(productId, deliveryOptionId);

      orderSummaryHtml();
      paymentSummaryHtml(); 
      // paymentSummaryHtml();
      // document.querySelector('.js-delivery-${matchingProduct.id}').innerHTML = dateString;
      // console.log(deliveryDate);
      // document.querySelector('.js-delivery-date').innerHTML = deliveryDate;


    });

  });

  



}
