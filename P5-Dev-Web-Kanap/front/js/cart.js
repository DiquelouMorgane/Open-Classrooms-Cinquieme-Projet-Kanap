//Redirection to confirmation page condition//
if (document.title == "Confirmation") {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const validConfirmation = document.getElementById("orderId");
  validConfirmation.innerText = id;
}
//if it's not the Confirmation Page we create the basket//
//---------------------------------------------------------------Basket Products------------------------------------------------------------------//
else {
  const productsList = JSON.parse(localStorage.getItem("products"));
  const cartItems = document.getElementById("cart__items");
  const submitButton = document.getElementById("order");
  let confFName, confName, confAddress, confCity, confEmail;
  confFName = confName = confAddress = confCity = confEmail = 0;
  let products = [];
  let contact = {};
  if (productsList && productsList.length != 0) {
    let i = 0;
    const productsListWanted = productsList.sort(function compare(a, b) {
      if (a.name < b.name) {return -1;}
      if (a.name > b.name) {return 1};
      return 0;
    });
    for (const data of productsListWanted) {
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
  } else {
    const newProduct = document.createElement("p");
    newProduct.innerText = "Il semblerait que votre panier soit vide, n'hésitez pas à aller visiter la page Produits pour trouver votre bonheur !";
    newProduct.style.textAlign = "center";
    section.appendChild(newProduct);
    updateQuantityAndPrice();
  }
  //Listen to inputs changes//
  const inputsQuantity = document.querySelectorAll(".itemQuantity");
  inputsQuantity.forEach((inputQuantity) => {
    inputQuantity.addEventListener('change', (e) => {
      //Get the specific Id of the choosen article//
      const article = getProductId(e) + getProductColor(e);
      if (e.target.value) {
        productsList.forEach((product) => {
          if (product.id == article) {
            product.quantity = e.target.value;
          }
        });
        localStorage.setItem("products", JSON.stringify(productsList));
        updateQuantityAndPrice();
      } else {
        removeItem(article, e.target);
      }
    });
  })
  //Send back the product Id stock in the parent article data of the changed input//
  function getProductId(e) {
    return e.target.closest("article").dataset.id;
  }
  //Send back the color of the product stock in the parent article data of the changed input//
  function getProductColor(e) {
    return e.target.closest("article").dataset.color;
  }
  //delete products no longer wanted//
  function removeItem(productToDelete, target) {
    if (confirm("Vous êtes sur le point de supprimer cet article de votre panier, voulez-vous continuer ?")) {
      productsList.splice(productToDelete, 1);
      localStorage.setItem("products", JSON.stringify(productsList));
      window.location.reload();
    } else if (target != undefined && target.value == 0) {
      target.value = 1;
    }
  }
  //Update total quantity and price of the basket//
  function updateQuantityAndPrice() {
    if (productsList) {
      let finalQuantity = productsList.reduce((a,b) => a + parseInt(b.quantity), 0);
      span1.innerText = finalQuantity;
      let finalPrice = productsList.reduce((a, b) => a + parseInt(b.quantity*b.price), 0);
      span2.innerText = finalPrice;
    } else {
      span1.innerText = "0";
      span2.innerText = "0";
    }
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
  submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    //Check all scopes//
    if (confFName == 0 && confName == 0 && confAddress == 0 && confCity == 0 && confEmail) {
      fullFormCheck();
    } else {
      alert("Attention, il semblerait que tous les champs n'aient pas été correctement remplis.");
    }
  });
  //Send request to the server to get the order Id//
  function postRequest () {
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
    fetch("http://localhost:3000/api/products/formToSend", entete)
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
    let isThereProduct = JSON.parse(localStorage.getItem(products));
    if (isThereProduct == null || isThereProduct.length < 1) {
      alert("Votre panier semble vide, n'hésitez pas à aller visiter la page Produits pour trouver votre bonheur !");
    } else {
      for (const ids of isThereProduct) {
        products.push(ids.idProduct);
      }
      //Add the contact object//
      contact.firstName = firstNameScope.value;
      contact.lastName = lastNameScope.value;
      contact.address = addressScope.value;
      contact.city = cityScope.value;
      contact.email = emailScope.value;
      postRequest();
    }
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
}