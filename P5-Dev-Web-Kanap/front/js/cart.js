//retrieve the wanted product//
function getProduct(){
  let cartItems = document.getElementById('cart__items');
  let cartStorage = JSON.parse(localStorage.getItem("cart"));
  console.log(cartStorage);
  //insert the wanted product in the basket//
for (let data of cartStorage){
  if (cartStorage == null){
    cartItems.innerHTML = "Votre panier est vide, n'hésitez pas à aller découvrir nos kanapés !";
  } else {
    cartItems.innerHTML = `<article class="cart__item" data-id="${data.id}" data-color="${data.color}">
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
          <p>Qté :</p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${data.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
  }}
  const removeItem = document.getElementsByClassName("deleteItem");
  removeItem.addEventListener("click", function(){
    localStorage.removeItem("cart");
  });
  let input = document.querySelector('.cart__item__content__settings__quantity');
  let result = document.querySelector('.itemQuantity');
  input.addEventListener('change', function(){
    result.textContent = this.value;
})
window.onload=function(){
  getProduct();
}
//---------------------------------------------------------------Form part------------------------------------------------------------------//
//retrieve the form//
let orderForm = document.querySelector('.cart__order__form');
//listen to firstNameScope changes//
orderForm.firstName.addEventListener('change', function() {
  checkFirstName(this);
})
//check the firstNameScope//
function checkFirstName(firstNameScope) {
  let firstNameRegEx = /[A-Za-z]/;
  let testingFirstName = firstNameRegEx.test(firstNameScope.value);
  if (testingFirstName) {
    document.querySelector('#firstNameErrorMsg').innerText = '';
    return true;
  } else {
    document.querySelector('#firstNameErrorMsg').innerText = 'Veuillez entrer un prénom valide';
    return false;
  }
}
//listen to nameScope changes//
orderForm.lastName.addEventListener('change', function() {
  checkLastName(this);
})
//check the lastNameScope//
function checkLastName(lastNameScope) {
  let lastNameRegEx = /[A-Za-z]/;
  let testingLastName = lastNameRegEx.test(lastNameScope.value);
  if (testingLastName) {
    document.querySelector('#lastNameErrorMsg').innerText = '';
    return true;
  } else {
    document.querySelector('#lastNameErrorMsg').innerText = 'Veuillez entrer un nom valide';
    return false;
  }
}
//listen to addressScope changes//
orderForm.address.addEventListener('change', function() {
  checkAdress(this);
})
//check the addressScope//
function checkAdress(addressScope) {
  let addressRegEx = /[A-Za-z.-_]/;
  let testingAddress = addressRegEx.test(addressScope.value);
  if (testingAddress) {
    document.querySelector('#addressErrorMsg').innerText = '';
    return true;
  } else {
    document.querySelector('#addressErrorMsg').innerText = 'Veuillez entrer une adresse valide';
    return false;
  }
}
//listen to cityScope changes//
orderForm.city.addEventListener('change', function() {
  checkCity(this);
})
//check the cityScope//
function checkCity(cityScope) {
  let cityRegEx = /^[0-9_]{5,}[A-Za-z]/;
  let testingCity = cityRegEx.test(cityScope.value);
  if (testingCity) {
    document.querySelector('#cityErrorMsg').innerText = '';
    return true;
  } else {
    document.querySelector('#cityErrorMsg').innerText = 'Veuillez entrer un nom de ville valide';
    return false;
  }
}
//listen to emailScope changes//
orderForm.email.addEventListener('change', function() {
  checkEmail(this);
})
//check the emailScope//
function checkEmail(emailScope) {
  let emailRegEx = /^[A-Za-z0-9.-_][@]{1}[A-Za-z0-9.-_][.]{1}[a-z]{2,3}/;
  let testingEmail = emailRegEx.test(emailScope.value);
  if (testingEmail) {
    document.querySelector('#emailErrorMsg').innerText = '';
    return true;
  } else {
    document.querySelector('#emailErrorMsg').innerText = 'Veuillez entrer un email valide';
    return false;
  }
}
//Listen to the submit form//
const fullForm = {
  firstName : document.querySelector('#firstName').value,
  lastName : document.querySelector('#lastName').value,
  address : document.querySelector('#address').value,
  city : document.querySelector('#city').value,
  email : document.querySelector('#email')
};
// Set the full form in the Local Storage//
localStorage.setItem("cart",JSON.stringify(fullForm));
//Validation of scopes//
if (checkFirstName(fullForm.firstName)
    && checkLastName(fullForm.lastName)
    && checkAdress(fullForm.address)
    && checkCity(fullForm.city)
    && checkEmail(fullForm.email)) {
      alert('Le formulaire a bien été envoyé.');
    }
  const formToSend = {
    cartStorage,
    fullForm
  };
  console.log(formToSend);
}