//Get all the products from the API//
function showProducts() {
    fetch("http://localhost:3000/api/products")
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        showProducts(data);
    })
    .catch(function(err){
    });
}
//Insert products in the Index page//
function showProducts(data) {
    for (products of data) {
    const items = document.getElementById()
    items.innerHTML = "<a href="./product.html?id=42"><article>
                        <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
                        <h3 class="productName">Kanap name1</h3>
                        <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
                        </article>
                        </a>"}
    window.onload=function(){
        showProducts();
    }
}}