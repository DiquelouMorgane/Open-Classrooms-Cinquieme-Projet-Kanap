//retrieve the wanted product//
function getProductContent(productId) {
    return fetch("http://localhost:3000/api/products/" + productId)
    .then(function (res) {
        return res.json();
    })
    .then(function (product) {
        return product;
    })
    .catch(function (error) {
        alert(error);
    });
}
//insert the wanted product in the basket//
function basketContent(data) {
    cart_Items.innerHTML = `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${data.imageUrl}" alt="${data.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${data.name}</h2>
        <p>${data.color}</p>
        <p>${data.price}</p>
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
  </article>`
}