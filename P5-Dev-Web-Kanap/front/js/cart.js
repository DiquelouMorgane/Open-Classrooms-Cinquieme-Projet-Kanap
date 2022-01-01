//retrieve the wanted product//
let productInBasket = JSON.parse(localStorage.getItem("cart"));
//insert the wanted product in the basket//
if (productInBasket === null){
  console.log("Votre panier est vide, n'hésitez pas à aller découvrir nos kanapés !");
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
          <p>Qté : ${product.quantity}</p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
  </section>`
  }
}