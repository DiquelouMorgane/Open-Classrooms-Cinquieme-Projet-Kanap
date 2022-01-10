//---------------------------------------------------------------Basket Products------------------------------------------------------------------//
let cartStorage = JSON.parse(localStorage.getItem("cartStorage"));
const orderButton = document.getElementById("order");
//retrieve the wanted product//
function getProduct(){
  let cartItems = document.getElementById('cart__items');
  console.log(cartStorage);
  //insert the wanted product in the basket//
  for (let data of cartStorage){
    //if the basket is empty//
    if (cartStorage === null){
      cartItems.innerHTML = "<p>Votre panier est vide, n'hésitez pas à aller découvrir nos kanapés !</p>";
    } else {
      //If the basket is not empty//
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
    }
  }
}
getProduct();
//change the quantity of the product//
function changeQuantity() {
  let input = document.querySelectorAll('.itemQuantity'); //NodeList
  let i = input.length-1;

  input[i].addEventListener('change', function() {
      if (this.value <= 0) {
          this.value = 0;
          cartStorage.splice(i, 1);
      } else if (this.value > 100) {
          this.value = 100;
          cartStorage[i].quantity = this.value;
      } else {
          cartStorage[i].quantity = this.value;
      }
      localStorage.setItem('cartStorage', JSON.stringify(cartStorage));
      location.reload();
  })
}
changeQuantity();
//delete products no longer wanted//
function deleteItem () {
  const removeItem = document.getElementsByClassName("deleteItem");
  removeItem.addEventListener("click", function(){
    storage.removeItem("cartStorage",JSON.stringify([{...product,color: document.getElementById('colors').value, quantity: document.getElementById('quantity').value}]));
  });
};
deleteItem();
//load the elements during the loading page //
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
  let cityRegEx = /[A-Za-z]/;
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
  let emailRegEx = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}/;
  let testingEmail = emailRegEx.test(emailScope.value);
  if (testingEmail) {
    document.querySelector('#emailErrorMsg').innerText = '';
    return true;
  } else {
    document.querySelector('#emailErrorMsg').innerText = 'Veuillez entrer un email valide';
    return false;
  }
}
//listen to form submit//
orderForm.addEventListener('submit', function(event) {
  event.preventDefault();
  //Create a contact object with the form data//
  const contact = {
    firstName : document.querySelector('#firstName').value,
    lastName : document.querySelector('#lastName').value,
    address : document.querySelector('#address').value,
    city : document.querySelector('#city').value,
    email : document.querySelector('#email').value
  };
  //Validation of scopes//
  if (checkFirstName(contact.firstName)
  && checkLastName(contact.lastName)
  && checkAdress(contact.address)
  && checkCity(contact.city)
  && checkEmail(contact.email)) {
    //Create an order object//
    const formToSend = {
      cartStorage,
      contact
    };
    //send the formToSend to the API//
    let url = 'http://localhost:3000/api/products/order';
    fetch (url, {
      method: 'POST',
      body: JSON.stringify(formToSend),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then (function(res) {
      if (res.ok) {
        return res.json();
      }
    }).then (function(data) {
      location.replace(`./confirmation.html?id=${data.orderId}`);
    }).catch(function(error) {
      console.log('Oups, une erreur est survenue :' + error);
    })
  }
})