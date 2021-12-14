//Get all the products from the API//
function showProducts() {
    fetch("http://localhost:3000/api/products")
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        formatProducts(data);
    })
    .catch(function(err){
    });
}
//Insert products in the Index page//
function formatProducts(data) {
    let itemsContent = '';

    for (let product of data) {
        itemsContent += `
            <a href="./product.html?id=42">
                <article>
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                </article>
            </a>`
    }

    var div = document.createElement('div');
    div.innerHTML = itemsContent

    document.getElementById('items').appendChild(div)
}
    window.onload=function(){
        showProducts();
    }
