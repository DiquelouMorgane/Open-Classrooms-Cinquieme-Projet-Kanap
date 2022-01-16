//--------------------------------------------------------Product Page Part-------------------------------------------------------------//
const productId = getProductId();
const productContent = getCardProducts(productId);
var product;
//retrieve the product id//
function getProductId () {
    const url = new URLSearchParams(window.location.search); 
    return url.get("id");
}
//retrieve the product in data base//
function getCardProducts(productId){
    fetch("http://localhost:3000/api/products/" + productId)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        product = data;
        cardProducts (data);
    })
    .catch(function(err){
    });
//Insert the selected product in the Product page//
function cardProducts(data) {
    document.querySelector(".item__img").innerHTML = `<img src=${data.imageUrl} alt="${data.altTxt}">`;
    document.querySelector("#title").innerHTML = `${data.name}`;
    document.querySelector("#price").innerText = `${data.price}`;
    document.querySelector("#description").innerText = `${data.description}`;
    for (color in data.colors) {
        colors.options[colors.options.length] = new Option(
          data.colors[color],
          data.colors[color]
        );
      }
    }
//--------------------------------------------------------Basket Part-------------------------------------------------------------//
//add the wanted product in an array, stock in the Local Storage//
function newProductObject (arrayData) {
    //Basket creation in the LocalStorage//
    let cartStorage = JSON.parse(localStorage.getItem("cartStorage"));
    if (cartStorage == null) {
        cartStorage = [];
    }
    console.log(cartStorage);
    //Create a new Product Card to save//
    let productQuantity = document.querySelector('#quantity').value;
    let productColor = document.querySelector('#colors').value;
    let newProduct = {
        id : `${arrayData._id}`,
        quantity : productQuantity,
        color : productColor,
    };
    localStorage.setItem('newProduct', JSON.stringify(newProduct));
    //Add the wanted product for each product wanted//
    let idValue = newProduct['id'];
    let colorValue = newProduct['color'];
    let quantityValue = newProduct['quantity'];
    if (localStorage.cartStorage == null) {
        cartStorage.push(newProduct);
    } else if (localStorage.cartStorage.includes(idValue) && localStorage.cartStorage.includes(colorValue)) {
        for (let i = 0; i < cartStorage.length; i++) {
            if (cartStorage[i].id === idValue && cartStorage[i].color === colorValue) {
                let index = cartStorage[i];
                let newQuantityValue = Number(quantityValue) + Number(index.quantity);
                index.quantity = newQuantityValue.toString();
            }
        }
    } else {
        cartStorage.push(newProduct);
    }
    //save the wanted product in the LocalStorage//
    const addToCart = document.getElementById("addToCart");
    addToCart.addEventListener("click", function() {
        console.log(product)
        localStorage.setItem("cartStorage",JSON.stringify([{...product,color: document.getElementById('colors').value, quantity: document.getElementById('quantity').value}]));
        console.log(localStorage);
        });
    }
};