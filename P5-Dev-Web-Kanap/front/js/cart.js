//Redirection to confirmation page condition//
if (document.title == "Cart") {
  //if it's not the Confirmation Page we create the basket//
  //---------------------------------------------------------------Basket Products------------------------------------------------------------------//
  let cartStorage = JSON.parse(localStorage.getItem("products"));
  console.log(cartStorage);
  const orderButton = document.getElementById("order");
  const products = [];
  const contact = {};
  //retrieve the wanted product//
  function getProduct(){
  let cartItems = document.getElementById('cart__items');
  //insert the wanted product in the basket//
  //if the basket is empty//
    if (cartStorage === null){
      cartItems.innerHTML = "<p>Votre panier est vide, n'hésitez pas à aller découvrir nos kanapés !</p>";
    } else {
    //If the basket is not empty//
      for (let i = 0; i < cartStorage.length; i ++) {
        console.log(cartStorage[i]);
        let data = cartStorage[i];
        let article = document.createElement("article");
        document.getElementById("cart__items").appendChild(article);
        article.innerHTML = `<article class="cart__item" data-id="${data.id}" data-color="${data.color}">
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
  //change the quantity of the product//
  function changeQuantity() {
    let input = document.querySelectorAll('.itemQuantity');
    for (let i = 0; i < cartStorage.length; i++){
      input[i].addEventListener('change', function() {
        console.log(this.value);
          if (this.value <= 0) {
            this.value = 0;
            cartStorage.splice(i, 1);
          } else if (this.value > 100) {
            this.value = 100;
            cartStorage[i].quantity = this.value;
          } else {
            cartStorage[i].quantity = this.value;
          }
        localStorage.setItem('products', JSON.stringify(cartStorage));
        location.reload();
      })
    }
  };
  //delete products no longer wanted//
  function removeItem() {
    let deleteButton = document.getElementsByClassName('deleteItem');
    for (let j = 0; j < cartStorage.length; j++){
      deleteButton[j].addEventListener("click", (event) => {
        event.preventDefault();
        let productId = cartStorage[j]._id;
        cartStorage = cartStorage.filter(
          (el) => el._id !== productId);
        console.log(cartStorage);
        localStorage.setItem("products", JSON.stringify(cartStorage));
        location.reload();
        alert("Ce produit a bien été supprimé du panier");
      });
    }
  };
  //calculate the total articles//
  function basketTotalArticles() {
    let finalQuantity = 0;
    for (let k = 0; k < cartStorage.length; k++) {
      finalQuantity += Number(cartStorage[k].quantity);
    };
    document.querySelector('#totalQuantity').innerText = finalQuantity;
  }
  basketTotalArticles();
  //calculate the total price//
  function BasketTotalPrice() {
    let totalPriceCalcul = [];
    for (let l = 0; l < cartStorage.length; l++) {
      let productPriceInBasket = cartStorage[l].price * cartStorage[l].quantity;
      totalPriceCalcul.push(productPriceInBasket);
    }
    const reducer = (accumulateur, currentValue) => accumulateur + currentValue;
    const totalPrice = totalPriceCalcul.reduce(reducer,0);
    document.querySelector('#totalPrice').innerText = totalPrice;
  }
  BasketTotalPrice();
  //load the elements during the loading page // 
  window.onload=function(){
    getProduct();
    changeQuantity();
    removeItem();
  }
  //---------------------------------------------------------------Form part------------------------------------------------------------------//
  //Check the form//
  const firstNameScope = document.getElementById("firstName");
  const lastNameScope = document.getElementById("lastName");
  const addressScope = document.getElementById("address");
  const cityScope = document.getElementById("city");
  const emailScope = document.getElementById("email");
  //listen to firstNameScope changes//
  firstNameScope.addEventListener("change", () => {
    const errorFirstName = document.getElementById("firstNameErrorMsg");
    if (!namesCheck(firstNameScope.value)) {
      errorFirstName.innerText = "Veuillez entrer un prénom valide";
      confFName = 1;
    } else {
      errorFirstName.innerText = "";
      confFName = 0;
    }
  })
  //listen to lastNameScope changes//
  lastNameScope.addEventListener("change", () => {
    const errorLastName = document.getElementById("lastNameErrorMsg");
    if (!namesCheck(lastNameScope.value)) {
      errorLastName.innerText = "Veuillez entrer un nom valide";
      confName = 1;
    } else {
      errorLastName.innerText = "";
      confName = 0;
    }
  })
  //listen to addressScope changes//
  addressScope.addEventListener("change", () => {
    const errorAddress = document.getElementById("addressErrorMsg");
    if (!addressCheck(addressScope.value)) {
      errorAddress.innerText = "Veuillez entrer une addresse valide";
      confAddress = 1;
    } else {
      errorAddress.innerText = "";
      confAddress = 0;
    }
  })
  //listen to cityScope changes//
  cityScope.addEventListener("change", () => {
    const errorCity = document.getElementById("cityErrorMsg");
    if (!namesCheck(cityScope.value)) {
      errorCity.innerText = "Veuillez entrer un nom de ville valide";
      confCity = 1;
    } else {
      errorCity.innerText = "";
      confCity = 0;
    }
  })
  //listen to emailScope changes//
  emailScope.addEventListener("change", () => {
    const errorEmail = document.getElementById("emailErrorMsg");
    if (!emailCheck(emailScope.value)) {
      errorEmail.innerText = "Veuillez entrer un email valide";
      confEmail = 1;
    } else {
      errorEmail.innerText = "";
      confEmail = 0;
    }
  });
  //listen to form submit//
  orderButton.addEventListener('click', function(event) {
    event.preventDefault();
    //Check all scopes//
    if (confFName == 0 && confName == 0 && confAddress == 0 && confCity == 0 && confEmail == 0) {
      fullFormCheck();
    } else {
      alert("Attention, il semblerait que tous les champs n'aient pas été correctement remplis.");
    }
  });
  //Send request to the server to get the order Id//
  function postRequest (cartStorage) {
    const formToSend = {
      products: cartStorage.map(p => p._id),
      contact
    };
    const entete = {
      method: 'POST',
      body: JSON.stringify(formToSend),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    };
    fetch("http://localhost:3000/api/products/order", entete)
    .then((res) => {
      //Check if we have a 201 status, to get the order Id//
      if (res.status == 201) {
        return res.json();
      } else {
        alert("Hélas il semblerait que la validation de l'achat ait échoué, veuillez réessayer ultérieurement");
        console.error("Echec de la requête POST, status :" + res.status);
      }
    })
    .then ((data) => {
      orderFinalisation(data.orderId);
    })
  }
  //Check if there is products in the basket and add the object to send with post function//
  function fullFormCheck() {
    let isThereProduct = JSON.parse(localStorage.getItem('products'));
    if (isThereProduct == null || isThereProduct.length < 1) {
      alert("Votre panier semble vide, n'hésitez pas à aller visiter la page Produits pour trouver votre bonheur !");
    } else if (isThereProduct > 0) {
      isThereProduct.push(products);
    }
    //Add the contact object//
    contact.firstName = firstNameScope.value;
    contact.lastName = lastNameScope.value;
    contact.address = addressScope.value;
    contact.city = cityScope.value;
    contact.email = emailScope.value;
    postRequest(isThereProduct);
  }
  //Empty the local storage and redirect to confirmation page with the order id//
  function orderFinalisation(orderId) {
    localStorage.clear();
    document.location.href = `confirmation.html?id=${orderId}`;
  }
  //RegEx used for the form check//
  function namesCheck (names) {
    return /^[^@&"()!_$*€£`+=\/;?#\d]+$/.test(names);
  }
  function addressCheck (address) {
    return /(?!^\d+$)^[^@&"()!_$*€£`+=\/;?#]+$/.test(address);
  }
  function emailCheck (email) {
    return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(email);
  }
  } else if(document.title == "Confirmation") {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const validConfirmation = document.getElementById("orderId");
    validConfirmation.innerText = id;
  }