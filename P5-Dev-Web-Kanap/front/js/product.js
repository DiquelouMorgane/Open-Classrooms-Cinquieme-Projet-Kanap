//retrieve the product id//
const productId = getProductId();
const productContent = getCardProducts(productId);

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
        cardProducts (data);
    })
    .catch(function(err){
    });
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
//Add the products in the basket//
//stock the wanted product in the LocalStorage//
const addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", function() {
    localStorage.setItem("cart",JSON.stringify([{id: productId, imageUrl: document.getElementsByClassName('item__img'), altTxt: document.getElementsByClassName('item__img'), name: document.getElementById('title'), color: document.getElementById('colors').value, price: document.getElementById('price'), quantity: document.getElementById('quantity').value}]));
console.log(localStorage);
    //if/else to avoid repetitive elements//
});
};