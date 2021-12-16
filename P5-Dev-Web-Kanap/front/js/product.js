//retrieve the product id//
var str = "http://localhost:3000/api/products";
var url = new URL(str);
var id = url.searchParams.get("id");

//create details products constants//
const itemImage = document.getElementsByClassName('item_img');
const itemTitle = document.getElementById('title');
const itemPrice = document.getElementById('price');
const itemDescription = document.getElementById('description');
const itemColors = document.getElementById('colors');

//retrieve the product in data base//
function cardProducts(){
    fetch("http://localhost:3000/api/products"+itemId)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        catchProducts(data);
    })
    .catch(function(err){
    });
}
function catchProducts(data) {
    itemImage.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
    itemTitle.innerHTML = `<h1>${data.name}</h1>`;
    itemPrice.innerText = `${data.price}`;
    itemDescription.innerText = `${data.description}`;    
}