function showProducts() {
    fetch("https://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        console.log(value);
    })
    .catch(function(err){
    });
}
const newElt = document.createElement("a");
let elt = document.getElementById("items");
elt.appendChild(newElt);