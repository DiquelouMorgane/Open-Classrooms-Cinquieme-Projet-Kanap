//--------------------------------------------------------Product Page Part-------------------------------------------------------------//
const productId = getProductId();
const productContent = getCardProducts(productId);
const selected = document.getElementById('colors');
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
const addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", function() {
    const choosenColor = selected.value;
    const inputQuantity = document.getElementById('quantity');
    const choosenQuantity = inputQuantity.value;
    if (choosenColor == "" && (choosenQuantity < 1 || choosenQuantity > 100)) {
        alert("N'oubliez pas de choisir un colori parmi notre gamme, et un nombre d'exemplaire (attention, les commandes sont limitées à 100 produits !");
    } else if (choosenColor == "") {
        alert("Il semblerait que vous ayez oublié de choisir parmi nos coloris proposés !");
    } else if (choosenQuantity < 1 || choosenQuantity > 100) {
        if (choosenQuantity > 100) {
            alert("Attention, les commandes sont limitées à 100 articles maximum !");
        }
        else {
            alert("Veuillez renseigner un nombre d'articles valide s'il vous plaît !")
        }
    } else {
        const specificId = productId + choosenColor;
        const product = {
            id : specificId,
            quantity : choosenQuantity,
            color : choosenColor,
        };
        let productInLocalStorage = JSON.parse(localStorage.getItem("products"));
        if (productInLocalStorage) {
            const index = productInLocalStorage.findIndex(item => item.id == specificId)
            if (index != -1) {
                const newQuantity = Number(productInLocalStorage[index].itemQuantity) + Number(quantity);
                const newProduct = {
                    id : specificId,
                    quantity : newQuantity,
                    color : choosenColor,
                }
                productInLocalStorage.splice(index, 1, newProduct);
            } else {
                productInLocalStorage.push(product);
            }
        } else {
            productInLocalStorage = [];
            productInLocalStorage.push(product);
        }
        localStorage.setItem("products", JSON.stringify([{...product,color: document.getElementById('colors').value, quantity: document.getElementById('quantity').value}]));
        alert("Votre produit a bien été ajouté au panier, n'hésitez pas à aller vois le reste de nos canapés !");
        console.log(localStorage);
        }
    })
}