//retrieve the wanted product//
function getProduct(){
let productId = getProductId();
let productInBasket = JSON.stringify(localStorage.getItem("cart",JSON.stringify([{id: productId, color: document.getElementById('colors').value, quantity: document.getElementById('quantity').value}])));
//insert the wanted product in the basket//
if (productInBasket == null){
  let emptyMessage ="Votre panier est vide, n'hésitez pas à aller découvrir nos kanapés !";
}
else {
  for (let product in productInBasket){
    document.querySelector(".cart").innerHTML += `<section id="cart__items">
    <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${product.color}</p>
        <p>${product.price}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté :</p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
  </section>`
  }
}}