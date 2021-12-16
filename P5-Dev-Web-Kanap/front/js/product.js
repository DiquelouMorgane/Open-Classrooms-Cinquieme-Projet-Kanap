//retrieve the product id//
const str = window.location.href;
const url = new URL(str);
const productId = url.searchParams.get("id");

//create details products constants//
const itemImage = document.getElementsByClassName('item_img');
const itemTitle = document.getElementById('title');
const itemPrice = document.getElementById('price');
const itemDescription = document.getElementById('description');
const itemColors = document.getElementById('colors');

//retrieve the product in data base//
function cardProducts(){
    fetch("http://localhost:3000/api/products/${productId}")
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        document.querySelector(".item__img").innerHTML = `<img src=${data.imageUrl} alt="${data.altTxt}">`
        document.querySelector("#title").innerHTML = `${data.name}`
        document.querySelector("#price").innerText = `${data.price}`
        document.querySelector("#description").innerText = `${data.description}`
    })
    .catch(function(err){
    });
};